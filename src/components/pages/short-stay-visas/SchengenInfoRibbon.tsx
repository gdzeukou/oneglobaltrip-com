
import { useState } from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ROUTES } from '@/constants/routes';

const SchengenInfoRibbon = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="py-4 bg-blue-50 border-y border-blue-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-4 text-center">
          <div className="flex-1 max-w-4xl">
            <p className="text-blue-800 text-lg">
              <strong>What's a Schengen visa?</strong> A single short-stay visa that lets you visit 27 European countries for up to 90 days in a 180-day period.
            </p>
          </div>
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                <Info className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>About Schengen Visas</DialogTitle>
                <DialogDescription className="space-y-3 text-left">
                  <p>The Schengen Area includes 27 European countries that have abolished passport controls at their mutual borders.</p>
                  <p>With one Schengen visa, you can travel freely between these countries for tourism, business, or visiting family for up to 90 days within any 180-day period.</p>
                  <p>This makes it perfect for European multi-country trips without needing separate visas for each destination.</p>
                  <Button asChild className="w-full mt-4">
                    <a href={ROUTES.SCHENGEN_SHORT_STAY_LANDING} target="_blank">
                      Learn More About Schengen Visas
                    </a>
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default SchengenInfoRibbon;
