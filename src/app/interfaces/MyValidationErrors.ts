export interface MyValidationErrors {
  name?: {
    key: string;
    required?: true;
    maxlength?: Length,
    minlength?: Length
  };
  price?: {
    key: string;
    required?: true;
  };
  description?: {
    key: string;
    required?: true;
    maxlength?: Length,
    minlength?: Length
  };
  value?: {
    key: string;
    required?: string;
    min?: MinValue,
    max?: MaxValue
  };
}

export interface MyValidationErrorsForTemplate {
  key: string;
  required?: true;
  maxlength?: Length;
  minlength?: Length;
  min?: MinValue;
  max?: MaxValue;
}

interface Length {
  requiredLength: number;
  actualLength: number;
}

interface MinValue {
  min: number;
  actual: number;
}

interface MaxValue {
  max: number;
  actual: number;
}
