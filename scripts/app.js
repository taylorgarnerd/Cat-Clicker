$(function () {
	
	var model = {
		init: function () {
			this.cats = [
				{name: "Jason",count:0,source:"img/mesmercat.png"},
				{name: "Trina",count:0,source:"img/jumpcat.png"},
				{name: "Kimberly",count:0,source:"img/starecat.png"},
				{name: "Billy",count:0,source:"img/playcat.png"},
				{name: "Zach",count:0,source:"img/runcat.png"}
			];

			this.currentCat = this.cats[0];
		},
		getAllCats: function () {
			return this.cats;
		},
		changeCurrentCat: function (catID) {
			this.currentCat = this.cats[catID];
		},
		getCurrentCat: function () {
			return this.currentCat;
		},
		clicked: function () {
			this.currentCat.count++;
		}
	};

	var octopus = {
		getCats: function () {
			return model.getAllCats();
		},
		clickCat: function () {
			model.clicked();
			containerView.render(model.getCurrentCat());
		},
		changeCat: function (id) {
			model.changeCurrentCat(id);
			containerView.init();
		},
		getCurrCat: function () {
			return model.getCurrentCat();
		},
		init: function () {
			model.init();
			listView.init();
			containerView.init();
		}
	};

	var listView = {
		init: function () {
			this.catList = document.getElementById('cat-list');

			listView.render();
		},
		render: function () {
			var cats = octopus.getCats();

			for (i = 0; i < cats.length; i++) {
				catBox = document.createElement('div');
				header = document.createElement('h1');

				catBox.className = "cat-button";
				catBox.setAttribute('id',i);
				header.innerHTML = cats[i].name;

				catBox.appendChild(header);
				this.catList.appendChild(catBox);
			}

			$('.cat-button').click(function () {
				var ID = $(this).attr('id');
				octopus.changeCat(ID);
			});
		},
	};

	var containerView = {
		init: function () {
			this.container = document.getElementById('cat-container');
			var currCat = octopus.getCurrCat();

			containerView.render(currCat);
		},
		render: function (cat) {
			$(this.container).empty();

			header = document.createElement('h1');
			image = document.createElement('img');
			countText = document.createElement('p');
			count = document.createElement('p');

			header.innerHTML = cat.name;
			image.src = cat.source;
			countText.innerHTML = "This is how many times you've clicked this damn cat";
			count.innerHTML = cat.count;

			this.container.appendChild(header);
			this.container.appendChild(image);
			this.container.appendChild(countText);
			this.container.appendChild(count);

			$('#cat-container img').click(function () {
				octopus.clickCat();
			});
		},
	};

	octopus.init();
});