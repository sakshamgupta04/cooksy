import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Settings, LogOut, Sun, Moon, Menu } from "lucide-react";
import cooksyLogo from "@/assets/cooksy-logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("recipes");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const recipes = [
    { id: 1, image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=400&fit=crop", title: "Delicious Pasta" },
    { id: 2, image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=500&h=400&fit=crop", title: "Healthy Salad" }
  ];

  const beverages = [
    { id: 1, image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=500&h=400&fit=crop", title: "Fresh Smoothie" },
    { id: 2, image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=500&h=400&fit=crop", title: "Herbal Tea" }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-gradient-warm">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-background/95 backdrop-blur-sm border-b border-border/50 w-full">
          {/* Left Section with Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={cooksyLogo} 
              alt="Cooksy Logo" 
              className="h-10 w-10 rounded-lg shadow-card"
            />
            <h1 className="text-xl font-bold text-foreground bg-gradient-hero bg-clip-text text-transparent">
              Cooksy
            </h1>
          </div>

          {/* Account Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch 
                checked={isDarkMode}
                onCheckedChange={toggleTheme}
              />
              <Moon className="h-4 w-4" />
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-background border-border/50" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">john.doe@gmail.com</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    Welcome back!
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-accent">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="hover:bg-accent text-destructive focus:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content Area with Sidebar */}
        <div className="flex">
          <AppSidebar />
          
          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Filter Tabs */}
            <div className="flex justify-center mb-12">
              <div className="flex bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-lg rounded-2xl p-2 border border-border/30 shadow-glow">
                <Button
                  variant={activeFilter === "recipes" ? "hero" : "ghost"}
                  className={`px-10 py-4 rounded-xl transition-all duration-500 transform ${
                    activeFilter === "recipes" 
                      ? "animate-scale-in shadow-elegant scale-105" 
                      : "hover:bg-accent/30 hover:scale-102"
                  }`}
                  onClick={() => setActiveFilter("recipes")}
                >
                  <span className="font-semibold text-lg">Recipes</span>
                </Button>
                <Button
                  variant={activeFilter === "beverages" ? "hero" : "ghost"}
                  className={`px-10 py-4 rounded-xl transition-all duration-500 transform ${
                    activeFilter === "beverages" 
                      ? "animate-scale-in shadow-elegant scale-105" 
                      : "hover:bg-accent/30 hover:scale-102"
                  }`}
                  onClick={() => setActiveFilter("beverages")}
                >
                  <span className="font-semibold text-lg">Beverages</span>
                </Button>
              </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-6xl mx-auto">
              {activeFilter === "recipes" && (
                <div className="animate-fade-in">
                  <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-hero bg-clip-text text-transparent">
                    Featured Recipes
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {recipes.map((recipe) => (
                      <div
                        key={recipe.id}
                        className="group bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-lg rounded-3xl overflow-hidden shadow-glow border border-border/20 hover:shadow-2xl transition-all duration-700 hover:scale-[1.05] cursor-pointer"
                      >
                        <div className="relative aspect-[5/4] overflow-hidden">
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <div className="p-8">
                          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {recipe.title}
                          </h3>
                          <p className="text-muted-foreground mt-3 text-base">
                            Delicious and easy to make
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeFilter === "beverages" && (
                <div className="animate-fade-in">
                  <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-hero bg-clip-text text-transparent">
                    Refreshing Beverages
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {beverages.map((beverage) => (
                      <div
                        key={beverage.id}
                        className="group bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-lg rounded-3xl overflow-hidden shadow-glow border border-border/20 hover:shadow-2xl transition-all duration-700 hover:scale-[1.05] cursor-pointer"
                      >
                        <div className="relative aspect-[5/4] overflow-hidden">
                          <img
                            src={beverage.image}
                            alt={beverage.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <div className="p-8">
                          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                            {beverage.title}
                          </h3>
                          <p className="text-muted-foreground mt-3 text-base">
                            Perfect for any time of day
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;