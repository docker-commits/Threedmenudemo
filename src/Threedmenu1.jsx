import React, { useState, useMemo, useRef } from "react";
import { Search, View } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ARButton = () => (
  <Button variant="outline" className="mt-2 w-full">
    <View className="mr-2 h-4 w-4" /> View on your table
  </Button>
);

const menuItems = [
  {
    id: 1,
    name: "Crispy Calamari",
    model:
      "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/glb/11-03-2024-06-39-11_Rustic_Italian_Salad.glb",
    price: 899,
    description: "Lightly battered squid rings with aioli",
    category: "Starters",
    recommended: true,
  },
  {
    id: 2,
    name: "Bruschetta",
    model:
      "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/glb/29-04-2024-03-14-29_Sushi_Platter.glb",
    price: 699,
    description: "Toasted bread topped with tomatoes, garlic, and basil",
    category: "Starters",
  },
  {
    id: 3,
    name: "Grilled Salmon",
    model:
      "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/glb/11-03-2024-06-39-11_Rustic_Italian_Salad.glb",
    price: 1899,
    description: "Fresh salmon fillet with lemon butter sauce",
    category: "Main Course",
    recommended: true,
  },
  {
    id: 4,
    name: "Reef Stroganoff",
    model:
      "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/glb/11-03-2024-06-39-11_Rustic_Italian_Salad.glb",
    price: 1699,
    description: "Tender beef in a creamy mushroom sauce over noodles",
    category: "Main Course",
  },
  {
    id: 5,
    name: "Chocolate Lava Cake",
    model:
      "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/glb/11-03-2024-06-39-11_Rustic_Italian_Salad.glb",
    price: 799,
    description: "Warm chocolate cake with a gooey center",
    category: "Desserts",
    recommended: true,
  },
];

const ThreeDMenu1 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Recommended", "Starters", "Main Course", "Desserts"];
  const arButtonRef = useRef({});

  const handleARButtonClick = (id) => {
    if (arButtonRef.current[id]) {
      arButtonRefs.current[id].click();
    }
  };
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Recommended" && item.recommended) ||
        item.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter]);

  return (
    <div className=" max-w-md mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">3DMenu</h1>
      </header>

      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search menu"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex flex-wrap overflow-x-auto mb-4 pb-2 ">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            className="mr-2 mb-4 whitespace-nowrap scroll-mx-1"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="  grid grid-cols-1 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="w-full">
            <CardContent className="p-4">
              <model-viewer
                poster="https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/thumbnails/11-03-2024-06-39-11_Salad.png"
                src={item.model}
                ar
                id="lazy-load"
                ar-modes="scene-viewer webxr quick-look"
                camera-controls
                tone-mapping="neutral"
                shadow-intensity="1"
                style={{
                  width: "100%",
                }}
              >
                 <div className="progress-bar hide" slot="progress-bar">
                  <div className="update-bar"></div>
                </div>
{/*               <div
                  className="absolute inset-0  bg-no-repeat "
                  slot="poster"
                  style={{
                    backgroundImage:
                      'url("https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/thumbnails/11-03-2024-06-39-11_Salad.png")',
                  }}
                ></div>
                <button
                  id="button-load"
                  slot="poster"
                  onClick={() =>
                    document.querySelector("#lazy-load").dismissPoster()
                  }
                >
                  Load 3D Model
                </button> */}
                <button
                  className="align-middle block"
                  slot="ar-button"
                  id="ar-button"
                  ref={(el) => (arButtonRefs.current[item.id] = el)}
                ></button>
              </model-viewer>
              <h3 className="font-bold">
                {item.name} {item.recommended && "⭐"}
              </h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="font-bold mt-2">${(item.price / 100).toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex justify-center space-x-1 ">
              <Button
                variant="outline"
                className="mt-2 flex-1 text-sm sm:text-base"
                onClick={() => handleARButtonClick(item.id)}
              >
                <View className="mr-2 h-4 w-4" /> View on your table
              </Button>
              <Button
                variant="outline"
                className="mt-2 flex-2 text-sm sm:text-base"
                onClick={() => ({})}
              >
                {/* {showModel ? "Show Image" : "Show 3D"} */}
                Show 3D
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ThreeDMenu1;
