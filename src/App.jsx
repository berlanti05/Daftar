// import "./App.css";
// import "./index.css";

// import { Routes, Route } from "react-router-dom";

// import ShoppingPage from "./pages/ShoppingPage/ShoppingPage";

// function App() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<ShoppingPage />} />
//         <Route path="/shopping" element={<ShoppingPage />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import "./index.css";

import { Routes, Route } from "react-router-dom";
import RecipeCard from "./components/Recipe/RecipeCard";
import ShoppingPage from "./pages/ShoppingPage/ShoppingPage";
import RecipeModel from "./components/RecipeModel/RecipeModel";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <RecipeCard
                recipe={{
                  id: 1786038760743,
                  name: "مقلوبة",
                  steps: "ما بعرف",
                  time: "35",
                  cals: "244",
                  tags: [
                    "ارز",
                    "بندورة",
                    "دجاج",
                    "ارز",
                    "بندورة",
                    "دجاج",
                    "ارز",
                    "بندورة",
                    "دجاج",
                  ],
                }}
              />
              <RecipeModel
                recipe={{
                  id: 1786038760743,
                  name: "مقلوبة",
                  steps: "ما بعرف",
                  time: "35",
                  cals: "244",
                  tags: [
                    "ارز",
                    "بندورة",
                    "دجاج",
                    "ارز",
                    "بندورة",
                    "دجاج",
                    "ارز",
                    "بندورة",
                    "دجاج",
                  ],
                }}
              />
            </>
          }
        />
        <Route path="/shopping" element={<ShoppingPage />} />
      </Routes>
    </div>
  );
}

export default App;
