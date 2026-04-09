import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ConverterForm } from './ConverterForm';

describe('ConverterForm', () => {
  const defaultProps = {
    fromCurrency: 'USD' as const,
    toCurrency: 'EUR' as const,
    fromAmount: '1',
    toAmount: '0.92',
    fromOptions: ['USD', 'EUR', 'PEN'] as any,
    toOptions: ['EUR', 'PEN', 'CNY'] as any,
    onFromCurrencyChange: vi.fn(),
    onToCurrencyChange: vi.fn(),
    onFromAmountChange: vi.fn(),
    onToAmountChange: vi.fn(),
  };

  it('renders both inputs with correct initial values', () => {
    render(<ConverterForm {...defaultProps} />);
    
    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs).toHaveLength(2);
    
    expect(inputs[0]).toHaveValue(1);
    expect(inputs[1]).toHaveValue(0.92);
  });

  it('calls onFromAmountChange when typing in source input', async () => {
    const onFromAmountChange = vi.fn();
    render(<ConverterForm {...defaultProps} onFromAmountChange={onFromAmountChange} />);
    
    const user = userEvent.setup();
    const sourceInput = screen.getAllByRole('spinbutton')[0];
    
    await user.clear(sourceInput);
    await user.type(sourceInput, '50');
    
    expect(onFromAmountChange).toHaveBeenCalled();
  });
});
