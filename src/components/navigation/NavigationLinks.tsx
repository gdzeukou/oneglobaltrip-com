
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Badge } from '@/components/ui/badge';
import { Plane, Shield, Crown, MapPin } from 'lucide-react';

interface NavigationLinksProps {
  textColor?: string;
}

const NavigationLinks = ({ textColor }: NavigationLinksProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const linkClass = (path: string) => 
    `px-3 py-2 text-sm font-medium transition-all duration-200 ${
      isActive(path) 
        ? `${textColor || 'text-deep-blue-900'} border-b-2 border-deep-blue-900` 
        : `${textColor || 'text-gray-700'} hover:text-deep-blue-900 hover:scale-105`
    }`;

  const triggerClass = `${textColor || 'text-gray-700'} hover:text-deep-blue-900`;

  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-2">
        <NavigationMenuItem>
          <Link to={ROUTES.HOME} className={linkClass(ROUTES.HOME)}>
            Home
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>
            Services
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <div className="row-span-3">
                <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500/50 to-blue-600/50 p-6 no-underline outline-none focus:shadow-md">
                  <Shield className="h-6 w-6 text-white" />
                  <div className="mb-2 mt-4 text-lg font-medium text-white">
                    Premium Services
                  </div>
                  <p className="text-sm leading-tight text-white/90">
                    Expert visa assistance with luxury travel experiences
                  </p>
                </div>
              </div>
              
              <Link
                to={ROUTES.VISAS}
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="flex items-center space-x-2">
                  <Plane className="h-4 w-4 text-blue-600" />
                  <div className="text-sm font-medium leading-none">Visa Services</div>
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Expert visa processing with 99.2% success rate
                </p>
              </Link>
              
              <Link
                to={ROUTES.PACKAGES}
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="flex items-center space-x-2">
                  <Crown className="h-4 w-4 text-blue-600" />
                  <div className="text-sm font-medium leading-none">Travel Packages</div>
                  <Badge variant="secondary" className="text-xs">Popular</Badge>
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Curated luxury experiences with visa included
                </p>
              </Link>
              
              <Link
                to={ROUTES.CONCIERGE}
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <div className="text-sm font-medium leading-none">Concierge</div>
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Personal travel specialists for complex trips
                </p>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to={ROUTES.CONTACT} className={linkClass(ROUTES.CONTACT)}>
            Contact
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationLinks;
