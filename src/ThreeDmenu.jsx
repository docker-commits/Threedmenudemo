import React, { useState, useMemo, useRef, useEffect } from "react";
import { Search, View } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import "@google/model-viewer/dist/model-viewer";
import "./App.css";
// import treedmodel1 from "../src/assets/model.glb";
const ARButton = () => (
  <Button variant="outline" className="mt-2 w-full">
    <View className="mr-2 h-4 w-4" /> View on your table
  </Button>
);

const menuItems = [
  {
    id: 1,
    name: "Crispy Calamari",
    price: 899,
    description: "Lightly battered squid rings with aioli",
    category: "Starters",
    recommended: true,
  },
  {
    id: 2,
    name: "Bruschetta",
    price: 699,
    description: "Toasted bread topped with tomatoes, garlic, and basil",
    category: "Starters",
  },
  {
    id: 3,
    name: "Grilled Salmon",
    price: 1899,
    description: "Fresh salmon fillet with lemon butter sauce",
    category: "Main Course",
    recommended: true,
  },
  {
    id: 4,
    name: "Beef Stroganoff",
    price: 1699,
    description: "Tender beef in a creamy mushroom sauce over noodles",
    category: "Main Course",
  },
  {
    id: 5,
    name: "Chocolate Lava Cake",
    price: 799,
    description: "Warm chocolate cake with a gooey center",
    category: "Desserts",
    recommended: true,
  },
];

const ThreeDMenu = () => {
  const arButton = useRef({});
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (arButton) {
      isHidden(arButton.current) ? setHide(true) : setHide(false);
    }
  }, [arButton]);

  const isHidden = (element) => {
    return element.offsetParent === null;
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Recommended", "Starters", "Main Course", "Desserts"];

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
    <div className="max-w-md mx-auto p-4">
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

      <div className="flex overflow-x-auto mb-4 pb-2">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            className="mr-2 whitespace-nowrap"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>

      <model-viewer
        src="https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/glb/11-03-2024-06-39-11_Rustic_Italian_Salad.glb"
        ar
        ar-modes="scene-viewer webxr quick-look"
        camera-controls
        tone-mapping="neutral"
        poster="poster.webp"
        shadow-intensity="1"
      >
        <div class="progress-bar hide" slot="progress-bar">
          <div class="update-bar"></div>
        </div>
        <button slot="ar-button" id="ar-button">
          View in your space
        </button>
      </model-viewer>

      <div className="grid grid-cols-1 gap-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="  items-center justify-center mb-2">
            <model-viewer
              src="https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/glb/11-03-2024-06-39-11_Rustic_Italian_Salad.glb"
              ar
              camera-controls
              touch-action="pan-y"
              alt="3d image"
              //   tone-mapping="neutral"
              //   poster="poster.webp"
              //   shadow-intensity="1"
              style={{}}
            >
              {/* <div class="progress-bar hide" slot="progress-bar">
                <div class="update-bar"></div>
              </div> */}

              <div className="mb-4">
                {/* <ARButton
                  slot="ar-button"
                  //   variant="solid"
                  //   textTransform="uppercase"
                  //   colorScheme="blue"
                  //   position="absolute"
                  //   bottom="4px"
                  //   left="27%"
                  //   height={6}
                  //   className="myB"
                  //   fontWeight="normal"
                  //   ml={-3.5}
                  id="ar-button"
                /> */}
              </div>
            </model-viewer>
            <button
              className="mt-10"
              slot="ar-button"
              style={{
                backgroundColor: "white",
                borderRadius: " 4px",
                border: "none",
                position: "absolute",
                top: "16px",
                right: " 16px",
              }}
              ref={arButton}
              onClick={() => {
                document.querySelector("model-viewer").activateAR();
              }}
            >
              👋 Activate AR
            </button>
          </div>
          //   {/* <h3 className="font-bold">
          //     {item.name} {item.recommended && "⭐"}
          //   </h3>
          //   <p className="text-sm text-gray-600">{item.description}</p>
          //   <p className="font-bold mt-2">${(item.price / 100).toFixed(2)}</p> */}
        ))}
      </div>
    </div>
  );
};

export default ThreeDMenu;
