import React, { useState, useMemo, useRef, useEffect } from "react";
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
    poster:
      "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/thumbnails/11-03-2024-06-39-11_Salad.png",
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
    poster:
      "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/thumbnails/29-04-2024-03-14-26_sushi_platter.png",
    model:
      "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/glb/29-04-2024-03-14-29_Sushi_Platter.glb",
    price: 699,
    description: "Toasted bread topped with tomatoes, garlic, and basil",
    category: "Starters",
  },
  {
    id: 3,
    name: "Grilled Salmon",
    poster:
      "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/thumbnails/11-03-2024-06-39-11_Salad.png",
    model:
      "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/glb/11-03-2024-06-39-11_Rustic_Italian_Salad.glb",
    price: 1899,
    description: "Fresh salmon fillet with lemon butter sauce",
    category: "Main Course",
    recommended: true,
  },
  {
    id: 4,
    name: "Beef Stroganoff",
    poster:
      "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/thumbnails/11-03-2024-06-39-11_Salad.png",
    model:
      "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/3d/glb/11-03-2024-06-39-11_Rustic_Italian_Salad.glb",
    price: 1699,
    description: "Tender beef in a creamy mushroom sauce over noodles",
    category: "Main Course",
  },
  {
    id: 5,
    name: "Chocolate Lava Cake",
    poster:
      "https://snc-apac-1.sgp1.cdn.digitaloceanspaces.com/5f5ed230-8264-48f1-9190-c1a9b112280a/assets/thumbnails/11-03-2024-06-39-11_Salad.png",
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
  const [toDItem, setToDItem] = useState({});
  const filters = ["All", "Recommended", "Starters", "Main Course", "Desserts"];
  const arButtonRefs = useRef([]);

  const handleARButtonClick = (id) => {
    // console.log(arButtonRefs.current);
    console.log(id);
    setToDItem((prevState) => ({
      ...prevState,
      [id]: false,
    }));
    setTimeout(() => {
      if (arButtonRefs.current[id]) {
        arButtonRefs.current[id].click();
        console.log(arButtonRefs.current[id].click());
      }
    }, 100);
  };
  useEffect(() => {
    const initialState = {};
    filteredItems.forEach((item) => {
      initialState[item.id] = true;
    });
    setToDItem(initialState);
  }, []);
  const handleShow3d = (itemId) => {
    setToDItem((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
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

      <div className="flex flex-wrap overflow-x-auto mb-4 pb-2 gap-2">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            className="mr-2 whitespace-nowrap scroll-mx-1"
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
              {toDItem[item.id] ? (
                <div className="h-[150px] flex justify-center items-center">
                  <img
                    src={item.poster}
                    alt={item.name}
                    className="w-[100px]"
                  />
                </div>
              ) : (
                <model-viewer
                  src={item.model}
                  ar
                  ar-modes="scene-viewer webxr quick-look"
                  camera-controls
                  tone-mapping="neutral"
                  shadow-intensity="1"
                  style={{
                    width: "100%",
                  }}
                >
                  <button
                    className="align-middle hidden "
                    slot="ar-button"
                    id="ar-button"
                    ref={(el) => (arButtonRefs.current[item.id] = el)}
                  ></button>
                </model-viewer>
              )}
              <div className="flex justify-between">
                <div className="text-left">
                  <h3 className="font-bold">
                    {item.name} {item.recommended && "⭐"}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <p className="font-bold mt-2">
                  ${(item.price / 100).toFixed(2)}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center space-x-1 ">
              <Button
                variant="outline"
                className="mt-2 flex-1 text-sm sm:text-base"
                onClick={() => {
                  handleARButtonClick(item.id);
                }}
              >
                <View className="mr-2 h-4 w-4" /> View on your table
              </Button>
              <Button
                variant="outline"
                className="mt-2 flex-2 text-sm sm:text-base"
                onClick={() => handleShow3d(item.id)}
              >
                {toDItem[item.id] ? "Show 3D" : "Show Image"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ThreeDMenu1;
