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
			containerView.render();
		},
		changeCat: function (id) {
			model.changeCurrentCat(id);
			containerView.render();
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

			$('.cat-button').click(function () {
				var ID = $(this).attr('id');
				octopus.changeCat(ID);
			});
		},
		render: function () {
			$(this.catList).empty();
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
		},
	};

	var containerView = {
		init: function () {
			this.container = document.getElementById('cat-container');
			this.header = document.getElementById('cat-name');
			this.image = document.getElementById('cat-image');
			this.count = document.getElementById('cat-count');

			containerView.render();

			$(this.image).click(function () {
				octopus.clickCat();
			});
		},
		render: function () {
			var cat = octopus.getCurrCat();

			this.header.textContent = cat.name;
			this.image.src = cat.source;
			this.count.textContent = cat.count;
		},
	};

	octopus.init();
});