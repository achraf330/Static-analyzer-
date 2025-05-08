import { useState } from "react";
import { Link } from "wouter";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  CheckCircle, 
  Menu as MenuIcon, 
  Home, 
  FileText, 
  HelpCircle, 
  Info, 
  Send, 
  ChevronRight 
} from "lucide-react";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col font-sans antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <CheckCircle className="h-8 w-8 text-primary dark:text-primary-500" />
              <h1 className="ml-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                ONPOINT <span className="text-primary dark:text-primary-500">Crypto Analyzer</span>
              </h1>
            </div>
          </Link>
          <div className="flex space-x-3 items-center">
            <ThemeToggle />
            
            <Link href="/support">
              <div className="hidden md:inline-block px-4 py-2 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                Support
              </div>
            </Link>
            
            <Link href="/faq">
              <div className="hidden md:inline-block px-4 py-2 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                FAQ
              </div>
            </Link>
            
            {/* Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="ml-2"
                  aria-label="Menu"
                >
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] sm:w-[380px]">
                <div className="flex flex-col h-full py-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center">
                    <CheckCircle className="h-6 w-6 text-primary mr-2" />
                    <span>Menu</span>
                  </h2>
                  
                  <nav className="space-y-0.5">
                    <Link href="/">
                      <div onClick={() => setIsMenuOpen(false)} className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer group">
                        <Home className="h-5 w-5 mr-3 text-gray-500 group-hover:text-primary" />
                        <span className="font-medium">Home</span>
                      </div>
                    </Link>
                    
                    <Link href="/submit">
                      <div onClick={() => setIsMenuOpen(false)} className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer group">
                        <Send className="h-5 w-5 mr-3 text-gray-500 group-hover:text-primary" />
                        <span className="font-medium">Submit Analysis Request</span>
                      </div>
                    </Link>
                    
                    <Link href="/sample">
                      <div onClick={() => setIsMenuOpen(false)} className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer group">
                        <FileText className="h-5 w-5 mr-3 text-gray-500 group-hover:text-primary" />
                        <span className="font-medium">Sample Analysis</span>
                      </div>
                    </Link>
                    
                    <Link href="/faq">
                      <div onClick={() => setIsMenuOpen(false)} className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer group">
                        <HelpCircle className="h-5 w-5 mr-3 text-gray-500 group-hover:text-primary" />
                        <span className="font-medium">FAQ</span>
                      </div>
                    </Link>
                    
                    <Link href="/support">
                      <div onClick={() => setIsMenuOpen(false)} className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer group">
                        <Info className="h-5 w-5 mr-3 text-gray-500 group-hover:text-primary" />
                        <span className="font-medium">Support</span>
                      </div>
                    </Link>
                  </nav>
                  
                  <div className="mt-auto pt-6">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Ready to optimize your crypto portfolio?
                      </p>
                      <Button 
                        className="w-full"
                        onClick={() => {
                          setIsMenuOpen(false);
                          window.location.href = "/submit";
                        }}
                      >
                        Get Your Analysis <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <CheckCircle className="h-8 w-8 text-primary-500" />
                <h2 className="ml-2 text-xl font-bold tracking-tight text-white">
                  ONPOINT <span className="text-primary-500">Crypto</span>
                </h2>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Professional crypto portfolio analysis and recommendations for informed investment decisions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="ri-twitter-fill text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="ri-telegram-fill text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="ri-discord-fill text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="ri-medium-fill text-xl"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Portfolio Analysis</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Market Reports</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Risk Assessment</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Custom Strategies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Educational Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Team</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li>
                  <Link href="/support">
                    <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact</span>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms">
                    <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Terms of Service</span>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy">
                    <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                  </Link>
                </li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Disclaimers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Risk Disclosure</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-800 text-sm text-gray-400 text-center">
            <p>&copy; {new Date().getFullYear()} ONPOINT Crypto Analyzer. All rights reserved.</p>
            <p className="mt-2">
              Disclaimer: Cryptocurrency investments are subject to high market risk. ONPOINT Crypto Analyzer is not a financial advisor, and our analyses should not be considered financial advice. Always do your own research before investing.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
