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
		},
		update: function (name,URL,clicks) {
			this.currentCat.name = name;
			this.currentCat.source = URL;
			this.currentCat.count = clicks;
		}
	};

	var octopus = {
		getCats: function () {
			return model.getAllCats();
		},
		clickCat: function () {
			model.clicked();
			adminView.render();
			containerView.render();
		},
		changeCat: function (id) {
			model.changeCurrentCat(id);
			adminView.render();
			containerView.render();
		},
		getCurrCat: function () {
			return model.getCurrentCat();
		},
		updateCat: function (name,URL,clicks) {
			model.update(name,URL,clicks);
			listView.render();
			containerView.render();
		},
		init: function () {
			model.init();
			listView.init();
			adminView.init();
			containerView.init();
		}
	};

	var listView = {
		init: function () {
			this.catList = document.getElementById('cat-list');
			this.buttons = document.getElementsByClassName('cat-button');
			console.log(this.buttons);

			listView.render();

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

			$('.cat-button').click(function () {
				var ID = $(this).attr('id');
				octopus.changeCat(ID);
			});
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
		}
	};

	var adminView = {
		init: function () {
			this.admin = document.getElementById('admin');
			this.adminButtons = document.getElementsByClassName('admin-buttons');
			this.adminCancel = document.getElementById('admin-cancel');
			this.adminForm = document.getElementById('admin-form');
			this.adminCatName = document.getElementById('admin-cat-name');
			this.adminCatURL = document.getElementById('admin-cat-url');
			this.adminCatClicks = document.getElementById('admin-cat-clicks');
			this.adminSubmit = document.getElementById('admin-submit');

			adminView.render();
			$(this.admin).hide();

			$(this.adminButtons).click(function () {
				$('#admin').toggle();
			});

			$(this.adminSubmit).click(function () {
				octopus.updateCat($('#admin-cat-name').val(),$('#admin-cat-url').val(),$('#admin-cat-clicks').val());
			});
		},
		render: function () {
			var cat = octopus.getCurrCat();

			this.adminCatName.value = cat.name;
			this.adminCatURL.value = cat.source;
			this.adminCatClicks.value = cat.count;
		}
	};

	octopus.init();
});