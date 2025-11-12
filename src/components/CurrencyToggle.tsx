import { useCurrency } from '@/contexts/CurrencyContext';
import { Button } from '@/components/ui/button';

const CurrencyToggle = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center gap-1 bg-secondary/20 rounded-lg p-1">
      <Button
        size="sm"
        variant={currency === 'USD' ? 'secondary' : 'ghost'}
        className="h-7 px-3 text-xs"
        onClick={() => setCurrency('USD')}
      >
        USD
      </Button>
      <Button
        size="sm"
        variant={currency === 'PKR' ? 'secondary' : 'ghost'}
        className="h-7 px-3 text-xs"
        onClick={() => setCurrency('PKR')}
      >
        PKR
      </Button>
    </div>
  );
};

export default CurrencyToggle;
