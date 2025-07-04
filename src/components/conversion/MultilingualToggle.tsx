import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Globe, ChevronDown } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
  greeting: string;
  tagline: string;
}

const MultilingualToggle = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    greeting: 'Welcome',
    tagline: 'You don\'t just travel, you arrive different'
  });

  const languages: Language[] = [
    {
      code: 'en',
      name: 'English',
      flag: '🇺🇸',
      greeting: 'Welcome',
      tagline: 'You don\'t just travel, you arrive different'
    },
    {
      code: 'es',
      name: 'Español',
      flag: '🇪🇸',
      greeting: 'Bienvenido',
      tagline: 'No solo viajas, llegas transformado'
    },
    {
      code: 'fr',
      name: 'Français',
      flag: '🇫🇷',
      greeting: 'Bienvenue',
      tagline: 'Vous ne voyagez pas seulement, vous arrivez différent'
    },
    {
      code: 'de',
      name: 'Deutsch',
      flag: '🇩🇪',
      greeting: 'Willkommen',
      tagline: 'Sie reisen nicht nur, Sie kommen verändert an'
    },
    {
      code: 'it',
      name: 'Italiano',
      flag: '🇮🇹',
      greeting: 'Benvenuto',
      tagline: 'Non viaggi solo, arrivi diverso'
    },
    {
      code: 'pt',
      name: 'Português',
      flag: '🇵🇹',
      greeting: 'Bem-vindo',
      tagline: 'Você não apenas viaja, você chega diferente'
    },
    {
      code: 'ru',
      name: 'Русский',
      flag: '🇷🇺',
      greeting: 'Добро пожаловать',
      tagline: 'Вы не просто путешествуете, вы прибываете другим'
    },
    {
      code: 'zh',
      name: '中文',
      flag: '🇨🇳',
      greeting: '欢迎',
      tagline: '您不仅仅是旅行，而是带着改变到达'
    },
    {
      code: 'ja',
      name: '日本語',
      flag: '🇯🇵',
      greeting: 'いらっしゃいませ',
      tagline: 'あなたは単に旅行するのではなく、変化して到着する'
    },
    {
      code: 'ar',
      name: 'العربية',
      flag: '🇸🇦',
      greeting: 'أهلاً وسهلاً',
      tagline: 'لا تسافر فقط، بل تصل مختلفاً'
    }
  ];

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    // Here you would typically integrate with i18n library
    console.log('Language changed to:', language.code);
  };

  return (
    <div className="fixed top-20 right-4 z-40">
      <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
        <CardContent className="p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 p-2 hover:bg-blue-50"
              >
                <Globe className="h-4 w-4 text-blue-600" />
                <span className="text-lg">{selectedLanguage.flag}</span>
                <span className="font-medium text-gray-700">{selectedLanguage.name}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent 
              align="end" 
              className="w-64 max-h-80 overflow-y-auto bg-white shadow-xl border-0"
            >
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  onClick={() => handleLanguageChange(language)}
                  className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
                    selectedLanguage.code === language.code 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium">{language.name}</div>
                    <div className="text-xs text-gray-500">{language.greeting}</div>
                  </div>
                  {selectedLanguage.code === language.code && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Preview tagline in selected language */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-600 italic text-center">
              "{selectedLanguage.tagline}"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultilingualToggle;