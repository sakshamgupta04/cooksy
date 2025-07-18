import { useState } from "react";
import { ChevronRight, Home, MessageSquare, BookOpen, Heart, Bookmark, Utensils, User, PanelLeftClose, PanelLeft } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
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
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [cooksybookOpen, setCooksybookOpen] = useState(false);
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar
      className={cn(
        "transition-all duration-500 ease-in-out border-r-0 shadow-xl",
        isCollapsed ? "w-16" : "w-72"
      )}
      collapsible="icon"
    >
      <SidebarContent className="bg-gradient-to-br from-background/95 via-background/98 to-accent/5 backdrop-blur-lg border-r border-border/20">
        {/* Collapse Button */}
        <div className="flex justify-end p-4 pb-2">
          <SidebarTrigger className={cn(
            "h-9 w-9 rounded-full transition-all duration-300 hover:scale-110",
            "bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10",
            "border border-primary/20 hover:border-primary/30 shadow-lg hover:shadow-primary/25"
          )}>
            {isCollapsed ? (
              <PanelLeft className="h-4 w-4 text-primary" />
            ) : (
              <PanelLeftClose className="h-4 w-4 text-primary" />
            )}
          </SidebarTrigger>
        </div>

        {/* Main Navigation */}
        <div className="px-4 py-2 space-y-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-3">
                {mainItems.map((item, index) => (
                  <SidebarMenuItem 
                    key={item.title}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <SidebarMenuButton
                      className={cn(
                        "group relative overflow-hidden rounded-2xl px-4 py-4 transition-all duration-300",
                        "hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10",
                        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r",
                        "before:from-primary/0 before:to-primary/0 before:transition-all before:duration-300",
                        "hover:before:from-primary/5 hover:before:to-primary/10",
                        isActive(item.url) 
                          ? "bg-gradient-to-r from-primary/15 to-primary/10 text-primary shadow-md shadow-primary/20 border border-primary/20" 
                          : "bg-gradient-to-r from-background/50 to-background/30 text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-accent/30 hover:to-accent/20"
                      )}
                      onClick={() => navigate(item.url)}
                    >
                      <item.icon className={cn(
                        "h-5 w-5 flex-shrink-0 relative z-10 transition-all duration-300",
                        "group-hover:scale-110 group-hover:rotate-3",
                        isActive(item.url) ? "text-primary drop-shadow-sm" : "group-hover:text-primary"
                      )} />
                      {!isCollapsed && (
                        <span className={cn(
                          "relative z-10 font-semibold transition-all duration-300",
                          "group-hover:translate-x-1",
                          isActive(item.url) ? "text-primary" : ""
                        )}>
                          {item.title}
                        </span>
                      )}
                      {isActive(item.url) && (
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/80 to-primary rounded-l-full" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Separator */}
          {!isCollapsed && (
            <div className="relative py-4">
              <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary/20 rounded-full" />
            </div>
          )}

          {/* Cooksybook Section */}
          <SidebarGroup>
            <Collapsible open={cooksybookOpen} onOpenChange={setCooksybookOpen}>
              <CollapsibleTrigger className="w-full group">
                <SidebarMenuButton className={cn(
                  "relative overflow-hidden rounded-2xl px-4 py-4 transition-all duration-300 w-full",
                  "hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/10",
                  "bg-gradient-to-r from-accent/20 to-accent/10 hover:from-accent/30 hover:to-accent/20",
                  "border border-accent/20 hover:border-accent/30"
                )}>
                  <BookOpen className="h-5 w-5 flex-shrink-0 text-accent-foreground transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
                  {!isCollapsed && (
                    <>
                      <span className="font-semibold text-accent-foreground transition-all duration-300 group-hover:translate-x-1">
                        Cooksybook
                      </span>
                      <ChevronRight 
                        className={cn(
                          "h-4 w-4 ml-auto transition-all duration-300 text-accent-foreground",
                          cooksybookOpen ? "rotate-90 scale-110" : "group-hover:translate-x-1"
                        )} 
                      />
                    </>
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {!isCollapsed && (
                <CollapsibleContent className="animate-accordion-down overflow-hidden">
                  <div className="mt-3 ml-6 space-y-2">
                    {cooksybookItems.map((item, index) => (
                      <SidebarMenuItem 
                        key={item.title}
                        className="animate-fade-in"
                        style={{ animationDelay: `${(index + 2) * 100}ms` }}
                      >
                        <SidebarMenuButton
                          className={cn(
                            "group relative overflow-hidden rounded-xl px-4 py-3 transition-all duration-300",
                            "hover:scale-[1.02] hover:shadow-md text-sm",
                            "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r",
                            "before:from-accent/0 before:to-accent/0 before:transition-all before:duration-300",
                            "hover:before:from-accent/5 hover:before:to-accent/10",
                            isActive(item.url) 
                              ? "bg-gradient-to-r from-accent/20 to-accent/15 text-accent-foreground shadow-md border border-accent/30" 
                              : "bg-gradient-to-r from-background/40 to-background/20 text-muted-foreground hover:text-accent-foreground hover:bg-gradient-to-r hover:from-accent/15 hover:to-accent/10"
                          )}
                          onClick={() => navigate(item.url)}
                        >
                          <item.icon className={cn(
                            "h-4 w-4 flex-shrink-0 relative z-10 transition-all duration-300",
                            "group-hover:scale-110",
                            isActive(item.url) ? "text-accent-foreground" : "group-hover:text-accent-foreground"
                          )} />
                          <span className={cn(
                            "relative z-10 font-medium transition-all duration-300",
                            "group-hover:translate-x-0.5",
                            isActive(item.url) ? "text-accent-foreground" : ""
                          )}>
                            {item.title}
                          </span>
                          {isActive(item.url) && (
                            <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/80 to-accent rounded-l-full" />
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </div>
                </CollapsibleContent>
              )}
            </Collapsible>
          </SidebarGroup>
        </div>

        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
      </SidebarContent>
    </Sidebar>
  );
}