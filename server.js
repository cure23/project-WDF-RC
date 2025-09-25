/*
Rebecca CUOMO - cure23xv@student.ju.se

Project Web Dev Fun - 2025

Administrator login: admin
Administrator password: wdf#2025
*/

//--- LOAD THE PACKAGES
const express = require("express");
const { engine } = require("express-handlebars");
const sqlite3 = require("sqlite3");

//--- DEFINE VARIABLES AND CONSTANTS
const port = 8080;
const app = express();

//--- DEFINE MIDDLEWARES
app.use(express.static("public")); // search unknown routes in the "public" directory
app.engine("handlebars", engine()); // initialize the engine to be handlebars
app.set("view-engine", "handlebars"); // set handlebars as the view engine
app.set("views", "./views"); // define the vievs directory to be ./views
app.use(express.urlencoded({ extended: true })); // fro processing forms sent using "post" method

//--- CONNECT TO DATABASE
const dbFile = "my-project-db.sqlite3.db";
db = new sqlite3.Database(dbFile);

// ----------------
//  USER FUNCTIONS
// ----------------

function initTableIngredients(mydb) {
  // MODEL for Ingredients
  const ingredients = [
    { id: "1", name: "All-purpose flour", quantity: "250 g" },
    { id: "2", name: "Bacon strips", quantity: "8" },
    { id: "3", name: "Baking powder", quantity: "2 tsp" },
    { id: "4", name: "Baking soda", quantity: "1 tsp" },
    { id: "5", name: "Balsamic glaze (optional)", quantity: "1 tbsp" },
    { id: "6", name: "Basil leaves", quantity: "handful" },
    { id: "7", name: "Black pepper", quantity: "to taste" },
    { id: "8", name: "Butter", quantity: "50 g" },
    { id: "9", name: "Burrata cheese", quantity: "2 (about 250 g each)" },
    { id: "10", name: "Cayenne pepper", quantity: "1 tsp" },
    { id: "11", name: "Celery stalk", quantity: "1 (chopped)" },
    { id: "12", name: "Cherry tomatoes", quantity: "300 g" },
    { id: "13", name: "Chicken wings", quantity: "1.5 kg" },
    { id: "14", name: "Chili flakes", quantity: "1 tsp" },
    { id: "15", name: "Chocolate chips", quantity: "150 g" },
    { id: "16", name: "Cooked chicken breast", quantity: "300 g" },
    { id: "17", name: "Cocoa powder (unsweetened)", quantity: "2 tbsp" },
    { id: "18", name: "Cream (optional)", quantity: "100 ml" },
    { id: "19", name: "Eggs", quantity: "4 (separated)" },
    { id: "20", name: "Flour", quantity: "50 g" },
    { id: "21", name: "Garlic cloves", quantity: "3 (minced)" },
    { id: "22", name: "Ground beef", quantity: "500 g" },
    { id: "23", name: "Honey", quantity: "2 tbsp" },
    { id: "24", name: "Lasagne sheets (egg pasta)", quantity: "300 g" },
    { id: "25", name: "Lemon juice", quantity: "from 1 lemon" },
    { id: "26", name: "Lemon zest", quantity: "from 1 lemon" },
    { id: "27", name: "Lettuce leaves", quantity: "4" },
    { id: "28", name: "Mascarpone cheese", quantity: "500 g" },
    { id: "29", name: "Mayonnaise", quantity: "4 tbsp" },
    { id: "30", name: "Milk", quantity: "300 ml" },
    { id: "31", name: "Mozzarella (optional)", quantity: "150 g" },
    { id: "32", name: "Nutmeg", quantity: "a pinch" },
    { id: "33", name: "Olive oil", quantity: "3 tbsp" },
    { id: "34", name: "Onion", quantity: "1 (chopped)" },
    { id: "35", name: "Paprika (smoked if possible)", quantity: "2 tsp" },
    { id: "36", name: "Parmesan cheese (grated)", quantity: "100 g" },
    { id: "37", name: "Parsley (fresh, chopped)", quantity: "2 tbsp" },
    { id: "38", name: "Potato", quantity: "1 large" },
    { id: "39", name: "Pumpkin (peeled, cubed)", quantity: "800 g" },
    { id: "40", name: "Ripe bananas", quantity: "3" },
    { id: "41", name: "Salt", quantity: "to taste" },
    { id: "42", name: "Savoiardi (ladyfinger biscuits)", quantity: "300 g" },
    { id: "43", name: "Soy sauce", quantity: "3 tbsp" },
    { id: "44", name: "Spaghetti", quantity: "400 g" },
    { id: "45", name: "Strong espresso coffee", quantity: "300 ml" },
    { id: "46", name: "Sugar", quantity: "100 g" },
    { id: "47", name: "Tomato", quantity: "2 (sliced)" },
    { id: "48", name: "Tomato passata", quantity: "700 ml" },
    { id: "49", name: "Tuna in olive oil (canned)", quantity: "200 g" },
    { id: "50", name: "Vanilla extract", quantity: "1 tsp" },
    { id: "51", name: "Vegetable broth", quantity: "800 ml" },
    { id: "52", name: "Carrot", quantity: "1 (chopped)" },
    { id: "53", name: "Marsala wine (optional)", quantity: "2 tbsp" },
  ];
  // create table Ingredients
  mydb.run(
    "CREATE TABLE Ingredient (iid INTEGER PRIMARY KEY, name TEXT NOT NULL, quantity TEXT NOT NULL)",
    (error) => {
      if (error) {
        // tests error: display error
        console.log("---> ERROR: ", error);
      } else {
        // tests error: no error, the table has been created
        console.log("---> Table Ingredients created!");

        // insert ingredients
        ingredients.forEach((oneIngredient) => {
          mydb.run(
            "INSERT INTO Ingredient (iid, name, quantity) VALUES (?, ?, ?)",
            [oneIngredient.id, oneIngredient.name, oneIngredient.quantity],
            (error) => {
              if (error) {
                console.log("ERROR: ", error);
              } else {
                console.log("---> Line added to the Ingredients table!");
              }
            }
          );
        });
      }
    }
  );
}

function initTableRecipes(mydb) {
  // MODEL for Recipes
  const recipes = [
    {
      id: "1",
      title: "Tiramisù",
      desc: "Brew the espresso and let it cool to room temperature. Stir in Marsala wine if using. Separate the eggs. In a large bowl, whisk the yolks with the sugar until pale and creamy. Add mascarpone and mix gently until smooth. In another bowl, beat the egg whites until stiff peaks form, then carefully fold them into the mascarpone mixture to keep it airy. Dip each ladyfinger briefly into the cooled coffee—do not soak or they'll become mushy—and arrange them in a single layer in a rectangular dish. Spread half the mascarpone cream over the biscuits, smoothing with a spatula. Repeat with a second layer of dipped ladyfingers and the remaining cream. Cover with cling film and refrigerate at least 4 hours (ideally overnight) to set. Before serving, dust generously with unsweetened cocoa powder",
      servings: "6",
      img: "/img/r_tiramisu.jpg",
      uid: "2",
    },

    {
      id: "2",
      title: "Spicy Chicken Wings",
      desc: "In a large bowl, combine olive oil, minced garlic, paprika, cayenne, chili flakes, honey, soy sauce, salt, and pepper. Mix well to form a marinade. Add the chicken wings and toss thoroughly so they are evenly coated. Cover and refrigerate for at least 1 hour, ideally overnight. Preheat the oven to 200°C (fan 180°C). Place the marinated wings on a baking tray lined with parchment paper. Roast for 35–40 minutes, turning halfway through, until golden brown and crispy, with slightly charred edges. For extra stickiness, brush with the cooking juices halfway through. Serve hot, with extra chili flakes or a yogurt dip on the side.",
      servings: "4-6",
      img: "/img/r_wings.jpg",
      uid: "5",
    },

    {
      id: "3",
      title: "American Pancakes",
      desc: "In a mixing bowl, whisk together the flour, baking powder, sugar, and a pinch of salt. In another bowl, beat the eggs with the milk and melted butter. Pour the wet mixture into the dry ingredients and whisk gently until just combined; don't overmix or the pancakes will be tough. A few small lumps are fine. Heat a non-stick frying pan over medium heat and lightly grease it. Pour a ladle of batter into the pan and cook until bubbles form on the surface and the edges start to look set (about 2 minutes). Flip carefully and cook the other side until golden. Keep warm in a low oven while you cook the remaining pancakes. Serve stacked, with butter, maple syrup, or fresh fruit.",
      servings: "4",
      img: "/img/r_pancakes.jpg",
      uid: "4",
    },

    {
      id: "4",
      title: "Lasagne alla Bolognese",
      desc: "Start with the ragù: heat olive oil in a large pan, add onion, carrot, and celery, and cook until softened. Add the beef, breaking it up with a spoon, and brown well. Stir in the tomato passata, season with salt and pepper, and add a splash of milk to mellow the acidity. Simmer gently for at least 45 minutes until rich and thick. Meanwhile, make the béchamel: melt butter in a saucepan, stir in the flour to form a roux, and cook for 1 minute. Gradually whisk in warm milk, stirring until smooth and thickened. Season with salt, pepper, and nutmeg. Preheat the oven to 180°C. Grease a baking dish, spread a thin layer of ragù, then arrange pasta sheets over it. Cover with ragù, béchamel, and a sprinkling of Parmesan. Repeat in layers, finishing with béchamel and Parmesan (plus mozzarella if using). Bake for 40–45 minutes until bubbling and golden on top. Let rest 10 minutes before serving.",
      servings: "6",
      img: "/img/r_lasagne.jpg",
      uid: "1",
    },

    {
      id: "5",
      title: "Chocolate Chip Muffins",
      desc: "Preheat the oven to 180°C and line a muffin tray with paper cases. In a large bowl, combine flour, baking powder, sugar, and a pinch of salt. In another bowl, whisk the eggs, milk, melted butter, and vanilla. Pour the wet mixture into the dry ingredients and stir lightly until just combined. Fold in most of the chocolate chips, reserving a few for topping. Divide the batter evenly among the muffin cases and sprinkle with the reserved chocolate chips. Bake for 20–25 minutes, until risen and golden. Allow to cool slightly before serving warm or at room temperature.",
      servings: "12",
      img: "/img/r_muffins.jpg",
      uid: "2",
    },

    {
      id: "6",
      title: "Lemon and Tuna Pasta",
      desc: "Bring a large pot of salted water to a boil and cook spaghetti until al dente. Meanwhile, heat olive oil in a pan and gently sauté garlic and chili flakes until fragrant. Add the drained tuna, breaking it up with a fork, and stir in lemon zest and juice. Add a ladle of pasta cooking water to loosen the sauce. Drain the spaghetti, reserving some water, and toss it in the pan with the tuna mixture. Add parsley, season generously with black pepper and a touch of salt. Adjust consistency with a little more pasta water if needed. Serve immediately with extra lemon zest.",
      servings: "4",
      img: "/img/r_pasta.jpg",
      uid: "3",
    },

    {
      id: "7",
      title: "Pumpkin Soup",
      desc: "Peel and cube the pumpkin and potato. Finely chop the onion. Heat olive oil in a large pot, add onion, and cook until softened. Add pumpkin and potato, stir for a few minutes, then pour in the vegetable broth. Bring to a boil, then reduce to a simmer and cook for about 25 minutes, until the vegetables are tender. Blend the soup with a hand blender until velvety and smooth. Return to the pan, stir in cream if using, and season with salt, pepper, and nutmeg. Serve hot, drizzled with olive oil or topped with croutons o pumpkin seeds.",
      servings: "4",
      img: "/img/r_soup.jpg",
      uid: "6",
    },

    {
      id: "8",
      title: "Banana Bread",
      desc: "Preheat the oven to 175°C. Grease and flour a loaf tin. Mash the bananas in a large bowl until smooth. Stir in the melted butter, then beat in sugar, eggs, and vanilla extract. In a separate bowl, mix flour, baking soda, and salt. Fold the dry mixture into the banana mixture until just combined. Pour the batter into the prepared loaf tin and bake for 50–60 minutes, until a skewer comes out clean. Allow to cool before slicing.",
      servings: "6-8",
      img: "/img/r_banana.jpg",
      uid: "2",
    },

    {
      id: "9",
      title: "Burrata Caprese Salad",
      desc: "Halve the cherry tomatoes and arrange them on a serving plate. Place the burrata in the center, allowing it to be the focal point. Scatter fresh basil leaves around. Drizzle generously with good-quality olive oil, season lightly with salt and pepper, and add balsamic glaze if you like a touch of sweetness. Serve immediately with crusty bread to scoop up the creamy burrata and juices.",
      servings: "4",
      img: "/img/r_caprese.jpg",
      uid: "5",
    },

    {
      id: "10",
      title: "Club Sandwich",
      desc: "Toast the bread slices lightly. Cook the bacon in a skillet until crisp, then drain on paper towels. Slice the chicken breast thinly. Spread mayonnaise on one slice of toast, add lettuce, tomato slices, and chicken, and season with salt and pepper. Top with a second slice of toast spread with mayo. Add egg and bacon, then finish with a final slice of toast. Press down gently, cut off crusts if desired, and slice diagonally into quarters. Secure with cocktail sticks and serve with fries or crisps.",
      servings: "4",
      img: "/img/r_sandwich.jpg",
      uid: "1",
    },
  ];
  // create table Recipes
  mydb.run(
    "CREATE TABLE Recipe (rid INTEGER PRIMARY KEY, title TEXT NOT NULL, desc TEXT NOT NULL, servings TEXT, img TEXT, uid INTEGER)",
    (error) => {
      if (error) {
        // tests error: display error
        console.log("---> ERROR: ", error);
      } else {
        // tests error: no error, the table has been created
        console.log("---> Table Recipes created!");

        // insert ingredients
        recipes.forEach((oneRecipe) => {
          mydb.run(
            "INSERT INTO Recipe (rid, title, desc, servings, img, uid) VALUES (?, ?, ?, ?, ?, ?)",
            [
              oneRecipe.id,
              oneRecipe.title,
              oneRecipe.desc,
              oneRecipe.servings,
              oneRecipe.img,
              oneRecipe.uid,
            ],
            (error) => {
              if (error) {
                console.log("ERROR: ", error);
              } else {
                console.log("---> Line added to the Recipe table!");
              }
            }
          );
        });
      }
    }
  );
}

//--- DEFINE THE ROUTES AND METHODS
app.get("/", (req, res) => {
  /* res.send("Hello World!"); */
  res.render("home.handlebars"); // the landing page information
});

app.get("/cv", (req, res) => {
  res.sendFile(__dirname + "/views/mycv-02.html"); //internal var def by node and it corresponds to where folder your project is
});

/* Could do the same for any pic/file requested 

    app.get("/something", (req, res) => {
      res.sendFile(__dirname + "/something.smt"); //internal var def by node and it corresponds to where folder your project is
    });

but it gets a lot, so you use the public and view folders and add the code: 

    app.use(express.static("public")) [line 5]

and it gives access to every incoming request to your public folder (imgs, stylesheets, js on client side...)

*/

// DEFINE THE /about ROUTE (MY CV)
app.get("/about", (req, res) => {
  res.render("mycv-02.handlebars");
});

// DEFINE THE /contact ROUTE (MY Contact)
app.get("/contact", (req, res) => {
  res.render("contact.handlebars");
});

// DEFINE THE /ingredients ROUTE
app.get("/ingredients", (req, res) => {
  db.all("SELECT * FROM Ingredient", (error, listOfIngredients) => {
    if (error) {
      console.log("ERROR: ", error);
    } else {
      model = { ingredients: listOfIngredients };
      res.render("ingredients.handlebars", model);
    }
  });
});

// DEFINE THE /ingredients ROUTE
app.get("/recipes", (req, res) => {
  db.all("SELECT * FROM Recipe", (error, listOfRecipes) => {
    if (error) {
      console.log("ERROR: ", error);
    } else {
      model = { recipes: listOfRecipes };
      res.render("recipes.handlebars", model);
    }
  });
});

// DEFINE THE /log-in ROUTE
app.get("/login", (req, res) => {
  res.render("login.handlebars");
});
app.post("/login", (req, res) => {
  const { un, pw } = req.body;

  // Verification
  if (!un || !pw) {
    return res.status(400).send("Username and password are required.");
  }
  // Sending Response
  res.send(`Recieved Username - ${un}, Password - ${pw}`);
});

//--- LISTEN TO INCOMING REQUESTS
app.listen(port, () => {
  //initTableIngredients(db);
  //initTableRecipes(db);
  console.log(`Server up and running on http://localhost:${port}...`);
});
