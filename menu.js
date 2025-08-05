document.addEventListener("DOMContentLoaded", () => {
  const menuContainer = document.getElementById("menu");
  const navLinks = document.querySelectorAll("nav a");

  function setActiveNav(id) {
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  }

  function renderCategory(id) {
    menuContainer.classList.add("fade-out");

    setTimeout(() => {
      menuContainer.innerHTML = "";
      const section = window.menu.find(s => s.id === id);
      if (!section) return;

      const sectionDiv = document.createElement("div");
      sectionDiv.className = "section";

      const isFormula = section.id === "formules";

      const subcategories = {};
      section.items.forEach(item => {
        const sub = item.subcategory || "Other";
        if (!subcategories[sub]) subcategories[sub] = [];
        subcategories[sub].push(item);
      });

      Object.entries(subcategories).forEach(([sub, items]) => {
        const subDiv = document.createElement("div");
        subDiv.className = "subcategory";

        const subTitle = document.createElement("h3");
        subTitle.textContent = sub;
        subDiv.appendChild(subTitle);

        const list = document.createElement("div");
        list.className = "list";

        items.forEach(item => {
          let itemDiv;

          if (isFormula) {
            itemDiv = document.createElement("div");
            itemDiv.className = "formula-item";

            const badge = document.createElement("span");
            badge.className = "formula-badge";
            badge.textContent = "Best Deal";

            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.name;

            const content = document.createElement("div");
            content.className = "formula-content";

            const title = document.createElement("h4");
title.innerHTML = `⭐ ${item.name}`;

            const desc = document.createElement("p");
            desc.textContent = item.description;

            const price = document.createElement("div");
            price.className = "formula-price";
            price.textContent = item.price;

            content.appendChild(title);
            content.appendChild(desc);

            itemDiv.appendChild(badge);
            itemDiv.appendChild(img);
            itemDiv.appendChild(content);
            itemDiv.appendChild(price);
          } else {
            itemDiv = document.createElement("div");
            itemDiv.className = "item";

            const contentDiv = document.createElement("div");
            contentDiv.className = "item-content";

            const name = document.createElement("h4");
            name.textContent = item.name;

            const price = document.createElement("div");
            price.className = "price";
            price.textContent = item.price;

            const desc = document.createElement("p");
            desc.textContent = item.description;

            const headerDiv = document.createElement("div");
            headerDiv.className = "item-content-header";
            headerDiv.appendChild(name);
            headerDiv.appendChild(price);

            contentDiv.appendChild(headerDiv);
            contentDiv.appendChild(desc);

            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.name;

            itemDiv.appendChild(contentDiv);
            itemDiv.appendChild(img);
          }

          list.appendChild(itemDiv);
        });

        subDiv.appendChild(list);
        sectionDiv.appendChild(subDiv);
      });

      menuContainer.appendChild(sectionDiv);
      menuContainer.classList.remove("fade-out");
      menuContainer.classList.add("fade-in");
    }, 150);

    setActiveNav(id);
  }

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const id = link.getAttribute("href").substring(1);
      renderCategory(id);
    });
  });

  renderCategory("cafes");
});
