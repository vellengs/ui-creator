angular.module('app').controller('demo.master', function ($scope, $location, $http, settings, $timeout) {

    $scope.minSize = false;

    var children, menuStack, found;

    function setSubMenu(page) {
        if (children.hasOwnProperty(page)) {
            $scope.minSize = false;
            $scope.treeSource = children[page];

            if ($scope.treeSource.length) {
                var hasExpanded = $scope.treeSource.filter(function (item) {
                    return item.expanded;
                });

                if (!hasExpanded.length) {
                    $scope.treeSource[0].expanded = true;
                }
            }
        } else {
            $scope.minSize = true;
        }
    }

    function walkTree(menus, parent) {
        angular.forEach(menus, function (item) {
            if (parent)
                item.parent = parent;

            menuStack.push(item);
            // if (menuStack.indexOf(item) < 0)
            walkTree(item.children, item);
        })
    }

    function walkParent(menu) {
        if (menu.parent) {
            menu.parent.expanded = true;
            walkParent(menu.parent);
        }
    }

    function expandedParents() {
        var uri = location.hash.substring(2);

        found = menuStack.filter(function (item) {
            return item.url && item.url.lastIndexOf(uri) > 0;
        });
        if (found.length === 1) {
            walkParent(found[0]);
            console.log(found);
        } else {
            found = null;
        }
    }


    $scope.load = function () {
        $http({
            url: "plugins/default/data/menus.json"
        }).then(
            function (res) {
                children = children || {};
                $scope.menus = res.data;
                if ($scope.menus.length) {
                    angular.forEach($scope.menus, function (item) {
                        var key = item.url.replace('#', '');
                        if (key && item.children)
                            children[key] = item.children;
                    });
                    menuStack = [];
                    walkTree($scope.menus);
                }
                expandedParents();
                if ($scope.currentPage) {
                    setSubMenu($scope.currentPage);
                }

                $timeout(function () {
                    angular.element("a[href='#" + location.hash.replace("#/", "") + "'").parent().addClass('tree-selected');
                }, 500);
            }
        );
    };

    $scope.loadSubMenus = function (page) {
        $scope.currentPage = page;
        if (children) {
            setSubMenu($scope.currentPage);
        }
    };

    $scope.unLoadSubMenus = function () {
        $scope.treeSource = null;
    };

    $scope.getMenus = function (value) {
        return menuStack.filter(function (raw) {
            return raw.name.includes(value);
        });
    };

    /**
     * 菜单搜索选择处理。
     * @param $item
     */
    $scope.onSelect = function ($item) {
        location.hash = $item.url;
        $scope.search = "";
    };
    $scope.load();
});