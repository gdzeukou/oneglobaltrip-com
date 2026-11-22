/**
 * Older pages import this for their header. It now renders the one site
 * header, so every page shares the same menu.
 */
import { SiteHeader } from '@/components/site/SiteShell';

const Navigation = () => (
  <div className="ogt ogt-chrome">
    <SiteHeader />
  </div>
);

export default Navigation;
