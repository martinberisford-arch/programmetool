export const ROLES = ['ADMIN', 'EDITOR'] as const;
export type UserRole = (typeof ROLES)[number];

export const QUESTION_TYPES = ['SINGLE', 'MULTI', 'YESNO'] as const;
export type QuestionType = (typeof QUESTION_TYPES)[number];

export const ITEM_STATUS = ['ACTIVE', 'INACTIVE'] as const;
export type ItemStatus = (typeof ITEM_STATUS)[number];
