function SlickSler (IDSelector, distance, displayItem){
    var IDElement = document.querySelector(IDSelector);

    var indexAddress = 0;
    IDElement.style.left = "0px";
    var startDragPosition;
    var endDragPosition;
    var Dragging = false;
    var currentPosition = 0;

    function getParent (element, selector) {
        while (element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }


    if(IDElement) {
        var parentElement = IDElement.parentElement.parentElement;
        var listImgSlider = IDElement;
        var buttonLeft = parentElement.children[parentElement.childElementCount - 2];
        var buttonRight = parentElement.children[parentElement.childElementCount - 1];
        var totalItem = listImgSlider.childElementCount;
        buttonLeft.style.opacity = '0.4';

        buttonLeft.addEventListener("click", function() {
            indexAddress--;
            if(indexAddress <= 0)
                indexAddress = 0;
            var length = indexAddress*distance;
            listImgSlider.style.left = `${-length}px`
            if(indexAddress == 0)
                buttonLeft.style.opacity = '0.4';
            else if(indexAddress > 0)
                buttonRight.style.opacity = '1';
        })

        buttonRight.addEventListener("click", function() {
            indexAddress++;
            if(indexAddress > (totalItem - displayItem))
                indexAddress = (totalItem - displayItem);
            var length = indexAddress*distance;
            listImgSlider.style.left = `${-length}px`
            if(indexAddress == (totalItem - displayItem))
                buttonRight.style.opacity = '0.4';
            else if(indexAddress < (totalItem - displayItem))
                buttonLeft.style.opacity = '1';
        })

        listImgSlider.addEventListener("mousedown", function(e) {
            Dragging = true;
            startDragPosition = e.offsetX;
        })

        listImgSlider.addEventListener("mouseup", function(e) {
            Dragging = false;
            if(parseInt(listImgSlider.style.left) < -distance*(totalItem - displayItem)) {
                listImgSlider.style.left = `${-distance*(totalItem - displayItem)}px`
            } else if(parseInt(listImgSlider.style.left) > 0) {
                listImgSlider.style.left = `${-distance*(totalItem - displayItem)}px`
            }
            e.preventDefault();
            var i = 1;
            while(i <= (totalItem - displayItem))
            {
                if(parseInt(listImgSlider.style.left) > -i*distance/2 && parseInt(listImgSlider.style.left) <= (i-1)*distance) {
                    indexAddress = i - 1;
                    var length = indexAddress*distance;
                    listImgSlider.style.left = `${-length}px`;
                    break;
                } else if(parseInt(listImgSlider.style.left) > -i*distance && parseInt(listImgSlider.style.left) <= -i*distance/2) {
                    indexAddress = i;
                    var length = indexAddress*distance;
                    listImgSlider.style.left = `${-length}px`;
                    break;
                }
                i++;
            }

            

            if(indexAddress == 0) {
                listImgSlider.style.left = "0px";
                buttonLeft.style.opacity = '0.4';
                buttonRight.style.opacity = '1';
            } else if(indexAddress == totalItem - displayItem){
                listImgSlider.style.left = `${-distance*(totalItem - displayItem)}px`;
                buttonRight.style.opacity = '0.4';
                buttonLeft.style.opacity = '1';
            } else if(indexAddress > 0 && indexAddress < totalItem - displayItem) {
                buttonLeft.style.opacity = '1';
                buttonRight.style.opacity = '1';
            }
        })

        listImgSlider.addEventListener("mouseout", function(e) {
            Dragging = false;
            if(parseInt(listImgSlider.style.left) < -distance*(totalItem - displayItem)) {
                listImgSlider.style.left = `${-distance*(totalItem - displayItem)}px`
            } else if(parseInt(listImgSlider.style.left) > 0) {
                listImgSlider.style.left = `${-distance*(totalItem - displayItem)}px`
            }
        })

        listImgSlider.addEventListener("mousemove", function(e) {
            if(!Dragging) return;
            currentPosition = parseInt(listImgSlider.style.left);
            endDragPosition = e.offsetX;
            listImgSlider.style.left = `${currentPosition + (endDragPosition - startDragPosition)}px`;
            check();
        })

        function check() {
            if(parseInt(listImgSlider.style.left) > 400)
                listImgSlider.style.left = "400px";
            else if(parseInt(listImgSlider.style.left) < (-distance*(totalItem - displayItem) - 400))
                listImgSlider.style.left = `${-distance*(totalItem - displayItem) - 400}px`;
        }

        const aaa = document.querySelectorAll("a");
        aaa.forEach(function(anchorss, i) {
            anchorss.addEventListener("click", function(e) {
                e.preventDefault();
            })
        })

        // band drag img
        const listImg = document.querySelectorAll("img");
        listImg.forEach(function(img, index) {
            img.ondragstart = function() {return false};
        })
    }
}