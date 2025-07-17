import { useState } from "react";
import { ChevronRight, Home, MessageSquare, BookOpen, Heart, Bookmark, Utensils, User, PanelLeftClose, PanelLeft } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "New Chat", url: "/chat", icon: MessageSquare },
];

const cooksybookItems = [
  { title: "Generated Recipes", url: "/recipes/generated", icon: Utensils },
  { title: "Liked Recipes", url: "/recipes/liked", icon: Heart },
  { title: "Saved Recipes", url: "/recipes/saved", icon: Bookmark },
  { title: "My Recipes", url: "/recipes/mine", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [cooksybookOpen, setCooksybookOpen] = useState(false);
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-accent/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar
      className={`${isCollapsed ? "w-16" : "w-72"} transition-all duration-500 ease-in-out border-r border-border/30 bg-gradient-to-b from-background/98 to-background/95 backdrop-blur-lg shadow-lg`}
      collapsible="icon"
    >
      <SidebarContent className="p-4 relative">
        {/* Collapse Button */}
        <div className="flex justify-end mb-4">
          <SidebarTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-accent/50 transition-all duration-300 hover:scale-110 shadow-md"
            >
              {isCollapsed ? (
                <PanelLeft className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </Button>
          </SidebarTrigger>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={`${getNavCls({ isActive: isActive(item.url) })} rounded-2xl px-4 py-4 transition-all duration-300 hover:scale-[1.02] flex items-center gap-4 shadow-sm hover:shadow-md group`}
                    >
                      <item.icon className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive(item.url) ? 'text-primary' : ''}`} />
                      {!isCollapsed && (
                        <span className="font-semibold animate-fade-in">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Separator */}
        {!isCollapsed && (
          <div className="mx-4 my-6 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
        )}

        {/* Cooksybook Section */}
        <SidebarGroup className="mt-4">
          <Collapsible open={cooksybookOpen} onOpenChange={setCooksybookOpen}>
            <CollapsibleTrigger className="w-full">
              <SidebarMenuButton className="rounded-2xl px-4 py-4 hover:bg-accent/50 transition-all duration-300 hover:scale-[1.02] flex items-center gap-4 w-full shadow-sm hover:shadow-md group">
                <BookOpen className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform duration-200 group-hover:scale-110" />
                {!isCollapsed && (
                  <>
                    <span className="font-semibold text-muted-foreground animate-fade-in">Cooksybook</span>
                    <ChevronRight 
                      className={`h-4 w-4 ml-auto transition-transform duration-300 ${
                        cooksybookOpen ? "rotate-90" : ""
                      }`} 
                    />
                  </>
                )}
              </SidebarMenuButton>
            </CollapsibleTrigger>
            {!isCollapsed && (
              <CollapsibleContent className="animate-accordion-down">
                <SidebarGroupContent className="mt-3">
                  <SidebarMenu className="space-y-2 ml-6">
                    {cooksybookItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink 
                            to={item.url} 
                            end 
                            className={`${getNavCls({ isActive: isActive(item.url) })} rounded-xl px-4 py-3 transition-all duration-300 hover:scale-[1.02] flex items-center gap-3 text-sm shadow-sm hover:shadow-md group`}
                          >
                            <item.icon className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive(item.url) ? 'text-primary' : ''}`} />
                            <span className="animate-fade-in font-medium">{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            )}
          </Collapsible>
        </SidebarGroup>

        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
      </SidebarContent>
    </Sidebar>
  );
}