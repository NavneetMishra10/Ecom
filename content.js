document.addEventListener("DOMContentLoaded", function() {
    const clothingContainer = document.getElementById('containerClothing');
    const accessoriesContainer = document.getElementById('containerAccessories');

    function createProductBox(product) {
        let boxDiv = document.createElement('div');
        boxDiv.id = 'box';

        let productLink = document.createElement('a');
        productLink.href = '/contentDetails.html?' + product.id;
        boxDiv.appendChild(productLink);

        let productImg = document.createElement('img');
        productImg.src = product.preview;
        productLink.appendChild(productImg);

        let detailsDiv = document.createElement('div');
        detailsDiv.id = 'details';
        productLink.appendChild(detailsDiv);

        let h3 = document.createElement('h3');
        h3.textContent = product.name;
        detailsDiv.appendChild(h3);

        let h4 = document.createElement('h4');
        h4.textContent = product.brand;
        detailsDiv.appendChild(h4);

        let h2 = document.createElement('h2');
        h2.textContent = 'Rs ' + product.price;
        detailsDiv.appendChild(h2);

        return boxDiv;
    }

    function dynamicClothingSection(ob) {
        return createProductBox(ob);
    }

    // Backend call to fetch products
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status == 200) {
                let contentTitle = JSON.parse(this.responseText);
                if (document.cookie.indexOf(",counter=") >= 0) {
                    let counter = document.cookie.split(",")[1].split("=")[1];
                    document.getElementById("badge").innerHTML = counter;
                }
                contentTitle.forEach(product => {
                    if (product.isAccessory) {
                        accessoriesContainer.appendChild(dynamicClothingSection(product));
                    } else {
                        clothingContainer.appendChild(dynamicClothingSection(product));
                    }
                });
            } else {
                console.log("call failed!");
            }
        }
    };
    httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true);
    httpRequest.send();
});
