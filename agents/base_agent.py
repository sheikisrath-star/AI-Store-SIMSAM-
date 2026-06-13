"""
VerdaSync AI — Multi-Agent Platform
Base Agent Class — shared by GRRA, VMA, RMA
"""
from __future__ import annotations
import json
import logging
from abc import ABC, abstractmethod
from typing import Any, Dict, List
import anthropic
from agents.models import AgentMessage, AgentType, MessageType, WorkflowState

logger = logging.getLogger(__name__)


class BaseAgent(ABC):
    """
    Foundation for all three specialized agents.
    Each agent wraps a Claude model with a fixed system prompt,
    a defined tool set, and a standard message-handling loop.
    """

    def __init__(
        self,
        agent_type:    AgentType,
        model:         str,
        system_prompt: str,
        tools:         List[Dict[str, Any]],
        api_key:       str | None = None,
    ) -> None:
        self.agent_type    = agent_type
        self.model         = model
        self.system_prompt = system_prompt
        self.tools         = tools
        self.client        = anthropic.Anthropic(api_key=api_key)
        self.logger        = logging.getLogger(f"agent.{agent_type.value}")

    # ── PUBLIC INTERFACE ──────────────────────────────────────────────────────

    async def process(self, state: WorkflowState, context: Dict[str, Any]) -> Dict[str, Any]:
        """
        Main entry point called by the Orchestrator.
        Runs an agentic loop: Claude decides which tools to call,
        executes them, feeds results back, until Claude emits a final text answer.
        """
        self.logger.info(f"[{self.agent_type}] Starting processing for workflow {state.workflow_id}")
        messages = self._build_initial_messages(state, context)
        result   = await self._agentic_loop(messages, state)
        self.logger.info(f"[{self.agent_type}] Completed processing for workflow {state.workflow_id}")
        return result

    def emit_message(
        self,
        state:     WorkflowState,
        recipient: AgentType | str,
        msg_type:  MessageType,
        payload:   Dict[str, Any],
        signal=None,
        priority=None,
    ) -> AgentMessage:
        """Build and log an inter-agent message."""
        from agents.models import MessagePriority
        msg = AgentMessage(
            workflow_id=state.workflow_id,
            sender=self.agent_type,
            recipient=recipient,
            type=msg_type,
            signal=signal,
            payload=payload,
            priority=priority or MessagePriority.NORMAL,
        )
        state.add_message(msg)
        self.logger.info(
            f"[{self.agent_type}] → [{recipient}] {msg_type.value}"
            + (f" [{signal.value}]" if signal else "")
        )
        return msg

    # ── AGENTIC LOOP ──────────────────────────────────────────────────────────

    async def _agentic_loop(
        self, messages: List[Dict], state: WorkflowState
    ) -> Dict[str, Any]:
        """
        Tool-use agentic loop:
        1. Send messages to Claude with available tools.
        2. If Claude returns tool_use blocks, execute each tool.
        3. Feed tool results back as tool_result messages.
        4. Repeat until Claude returns end_turn or text with no tool calls.
        """
        max_iterations = 10
        iteration = 0

        while iteration < max_iterations:
            iteration += 1
            response = self.client.messages.create(
                model=self.model,
                max_tokens=4096,
                system=self.system_prompt,
                tools=self.tools,
                messages=messages,
            )

            self.logger.debug(f"[{self.agent_type}] Loop {iteration}: stop_reason={response.stop_reason}")

            # No more tool calls → extract final structured output
            if response.stop_reason == "end_turn":
                return self._extract_result(response)

            # Process tool_use blocks
            if response.stop_reason == "tool_use":
                tool_results = []
                for block in response.content:
                    if block.type == "tool_use":
                        result = await self._execute_tool(block.name, block.input, state)
                        tool_results.append({
                            "type":        "tool_result",
                            "tool_use_id": block.id,
                            "content":     json.dumps(result),
                        })

                # Append assistant response and all tool results
                messages.append({"role": "assistant", "content": response.content})
                messages.append({"role": "user",      "content": tool_results})
                continue

            # Unexpected stop reason
            self.logger.warning(f"[{self.agent_type}] Unexpected stop_reason: {response.stop_reason}")
            return self._extract_result(response)

        raise RuntimeError(f"[{self.agent_type}] Exceeded max agentic loop iterations ({max_iterations})")

    # ── TOOL EXECUTION (SUBCLASSES IMPLEMENT _dispatch_tool) ─────────────────

    async def _execute_tool(
        self, tool_name: str, tool_input: Dict, state: WorkflowState
    ) -> Dict[str, Any]:
        """Dispatch a tool call and return its result."""
        self.logger.info(f"[{self.agent_type}] Executing tool: {tool_name}({list(tool_input.keys())})")
        try:
            result = await self._dispatch_tool(tool_name, tool_input, state)
            self.logger.info(f"[{self.agent_type}] Tool {tool_name} → success")
            return {"status": "ok", "result": result}
        except Exception as exc:
            self.logger.error(f"[{self.agent_type}] Tool {tool_name} failed: {exc}")
            return {"status": "error", "error": str(exc)}

    @abstractmethod
    async def _dispatch_tool(
        self, tool_name: str, tool_input: Dict, state: WorkflowState
    ) -> Any:
        """Each agent implements its own tool dispatch table."""
        ...

    # ── HELPERS ───────────────────────────────────────────────────────────────

    def _build_initial_messages(
        self, state: WorkflowState, context: Dict[str, Any]
    ) -> List[Dict]:
        """Build the initial user message from workflow state + context."""
        context_str = json.dumps(context, indent=2, default=str)
        return [{
            "role": "user",
            "content": (
                f"Workflow ID: {state.workflow_id}\n"
                f"Vendor Registration Details:\n{context_str}\n\n"
                f"Process this request and return a structured JSON result "
                f"using the tools available to you. Be thorough."
            ),
        }]

    def _extract_result(self, response) -> Dict[str, Any]:
        """Extract structured JSON from the final Claude response."""
        for block in response.content:
            if hasattr(block, "text"):
                text = block.text.strip()
                # Try to parse embedded JSON
                try:
                    start = text.find("{")
                    end   = text.rfind("}") + 1
                    if start != -1 and end > start:
                        return json.loads(text[start:end])
                except json.JSONDecodeError:
                    pass
                return {"raw_response": text}
        return {}
