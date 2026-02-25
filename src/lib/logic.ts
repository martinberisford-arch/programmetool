export type ConditionOp = 'EQUALS' | 'NOT' | 'IN';

export type LogicCondition = {
  questionId?: string;
  questionOrder?: number;
  op: ConditionOp;
  value: string | string[];
};

export type LogicNode = {
  operator: 'AND' | 'OR';
  conditions: LogicCondition[];
};

export function evaluateLogic(logic: LogicNode, answers: Record<string, string | string[]>): boolean {
  const checkCondition = (condition: LogicCondition) => {
    const key = condition.questionId ?? String(condition.questionOrder ?? '');
    const answer = answers[key];
    if (answer === undefined) return false;

    switch (condition.op) {
      case 'EQUALS':
        return answer === condition.value;
      case 'NOT':
        return answer !== condition.value;
      case 'IN': {
        const values = Array.isArray(condition.value) ? condition.value : [condition.value];
        if (Array.isArray(answer)) return answer.some((item) => values.includes(item));
        return values.includes(answer);
      }
      default:
        return false;
    }
  };

  if (!logic.conditions.length) return true;

  return logic.operator === 'AND'
    ? logic.conditions.every(checkCondition)
    : logic.conditions.some(checkCondition);
}
