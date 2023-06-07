import React from "react";


const Cards = (props) => {
    
      return  <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            <div class="p-4 lg:w-1/3">
              <div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                {/* <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2> */}
                <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{props.id}</h1>
                <p class="leading-relaxed mb-3">{props.idvalue}</p>
                <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{props.hash}</h1>
                <p class="leading-relaxed mb-3">{props.hashValue}</p>
                <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{props.size}</h1>
                <p class="leading-relaxed mb-3">{props.sizeValue}</p>
                <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{props.name}</h1>
                <p class="leading-relaxed mb-3">{props.nameValue}</p>
                <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{props.description}</h1>
                <p class="leading-relaxed mb-3">{props.descriptionValue}</p>
                <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{props.uploadTime}</h1>
                <p class="leading-relaxed mb-3">{props.uploadTime}</p>
                <h1 class="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{props.uploader}</h1>
                <p class="leading-relaxed mb-3">{props.uploader}</p>

              </div>
            </div>
            
          </div> 
        </div>
      </section>
}

export default Cards;
