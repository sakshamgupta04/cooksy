import { useState } from "react";
import { ChevronRight, Home, MessageSquare, BookOpen, Heart, Bookmark, Utensils, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
      className={`${isCollapsed ? "w-16" : "w-72"} transition-all duration-500 ease-in-out border-r border-border/50 bg-background/95 backdrop-blur-sm`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={`${getNavCls({ isActive: isActive(item.url) })} rounded-xl px-4 py-3 transition-all duration-300 hover:scale-[1.02] flex items-center gap-3`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="font-medium animate-fade-in">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Cooksybook Section */}
        <SidebarGroup className="mt-6">
          <Collapsible open={cooksybookOpen} onOpenChange={setCooksybookOpen}>
            <CollapsibleTrigger className="w-full">
              <SidebarMenuButton className="rounded-xl px-4 py-3 hover:bg-accent/50 transition-all duration-300 hover:scale-[1.02] flex items-center gap-3 w-full">
                <BookOpen className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                {!isCollapsed && (
                  <>
                    <span className="font-medium text-muted-foreground animate-fade-in">Cooksybook</span>
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
                <SidebarGroupContent className="mt-2">
                  <SidebarMenu className="space-y-1 ml-4">
                    {cooksybookItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink 
                            to={item.url} 
                            end 
                            className={`${getNavCls({ isActive: isActive(item.url) })} rounded-lg px-3 py-2 transition-all duration-300 hover:scale-[1.02] flex items-center gap-3 text-sm`}
                          >
                            <item.icon className="h-4 w-4 flex-shrink-0" />
                            <span className="animate-fade-in">{item.title}</span>
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
      </SidebarContent>
    </Sidebar>
  );
}