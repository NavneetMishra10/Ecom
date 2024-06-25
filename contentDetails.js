console.clear();

let id = location.search.split('?')[1];
console.log(id);

if (document.cookie.indexOf(',counter=') >= 0) {
    let counter = document.cookie.split(',')[1].split('=')[1];
    document.getElementById("badge").innerHTML = counter;
}

function dynamicContentDetails(ob) {
    let mainContainer = document.createElement('div');
    mainContainer.id = 'containerD';
    document.getElementById('containerProduct').appendChild(mainContainer);

    let imageSectionDiv = document.createElement('div');
    imageSectionDiv.id = 'imageSection';

    let imgTag = document.createElement('img');
    imgTag.id = 'imgDetails';
    imgTag.src = ob.preview;

    imageSectionDiv.appendChild(imgTag);

    let productDetailsDiv = document.createElement('div');
    productDetailsDiv.id = 'productDetails';

    let h1 = document.createElement('h1');
    h1.textContent = ob.name;

    let h4 = document.createElement('h4');
    h4.textContent = ob.brand;

    let detailsDiv = document.createElement('div');
    detailsDiv.id = 'details';

    let h3DetailsDiv = document.createElement('h3');
    h3DetailsDiv.textContent = 'Rs ' + ob.price;

    let h3 = document.createElement('h3');
    h3.textContent = 'Description';

    let para = document.createElement('p');
    para.textContent = ob.description;

    let productPreviewDiv = document.createElement('div');
    productPreviewDiv.id = 'productPreview';

    let h3ProductPreviewDiv = document.createElement('h3');
    h3ProductPreviewDiv.textContent = 'Product Preview';
    productPreviewDiv.appendChild(h3ProductPreviewDiv);

    ob.photos.forEach((photo, index) => {
        let imgTagProductPreviewDiv = document.createElement('img');
        imgTagProductPreviewDiv.id = 'previewImg';
        imgTagProductPreviewDiv.src = photo;
        imgTagProductPreviewDiv.onclick = function() {
            console.log("clicked " + this.src);
            imgTag.src = this.src;
        };
        productPreviewDiv.appendChild(imgTagProductPreviewDiv);
    });

    let buttonDiv = document.createElement('div');
    buttonDiv.id = 'button';

    let buttonTag = document.createElement('button');
    buttonTag.textContent = 'Add to Cart';
    buttonTag.onclick = function() {
        let order = id + " ";
        let counter = 1;
        if (document.cookie.indexOf(',counter=') >= 0) {
            order = id + " " + document.cookie.split(',')[0].split('=')[1];
            counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1;
        }
        document.cookie = "orderId=" + order + ",counter=" + counter;
        document.getElementById("badge").innerHTML = counter;
        console.log(document.cookie);
    };

    buttonDiv.appendChild(buttonTag);

    mainContainer.appendChild(imageSectionDiv);
    mainContainer.appendChild(productDetailsDiv);
    productDetailsDiv.appendChild(h1);
    productDetailsDiv.appendChild(h4);
    productDetailsDiv.appendChild(detailsDiv);
    detailsDiv.appendChild(h3DetailsDiv);
    detailsDiv.appendChild(h3);
    detailsDiv.appendChild(para);
    productDetailsDiv.appendChild(productPreviewDiv);
    productDetailsDiv.appendChild(buttonDiv);
}

// Backend call
let httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
    if (this.readyState === 4 && this.status == 200) {
        console.log('connected!!');
        let contentDetails = JSON.parse(this.responseText);
        console.log(contentDetails);
        dynamicContentDetails(contentDetails);
    } else {
        console.log('not connected!');
    }
};

httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + id, true);
httpRequest.send();
