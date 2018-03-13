'use strict';

/**
 * Directives 
 */
var Directives = angular.module('events.directives', []);

Directives.directive('events', [function events(LoadedFile) {
  return {
    restrict: 'E',
    templateUrl: 'public/partials/home.html',
    link: function eventsLink(scope, element, attributes) {

    },
    controller: ['$scope', '$http', '$window', 'LoadedFile', '$element', 
	    function eventsCtrl($scope, $http, $window, LoadedFile, $element) {
	      $scope.data = {
          file: null,
          FPTree: null,
          tree: {
            margin: {
                top: 20, 
                right: 120, 
                bottom: 20, 
                left: 120,
            },
            width: 0,
            height: 0,
            i: 0,
            duration: 750,
            root: null,
          },
        };
   
        $scope.drawTree = function drawTree() {
          var treeProps = $scope.data.tree;
          treeProps.width = 4000 - treeProps.margin.right - treeProps.margin.left;
          treeProps.height = 800 - treeProps.margin.top - treeProps.margin.bottom;

          treeProps.tree = window.d3.layout.tree().size([treeProps.height, treeProps.width]);

          treeProps.diagonal = window.d3.svg.diagonal().projection(function diagonalProjection(point) { 
            return [point.y, point.x]; 
          });

          treeProps.svg = window.d3.select('.tree-holder').append('svg')
            .attr('width', treeProps.width + treeProps.margin.right + treeProps.margin.left)
            .attr('height', treeProps.height + treeProps.margin.top + treeProps.margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + treeProps.margin.left + ',' + treeProps.margin.top + ')');

          window.d3.select(self.frameElement).style('height', '800px');

          setTimeout(function setTimeoutDelay() {
            treeProps.root = $scope.data.FPTree;
            treeProps.root.x0 = treeProps.height/2;
            treeProps.root.y0 = 0;

            function collapse(pd) {
              if (pd.children) {
                pd._children = pd.children;
                pd._children.forEach(collapse);
                pd.children = null;
              }
            }

            treeProps.root.children.forEach(collapse);
            $scope.update(treeProps.root);
          }, 0);

          $scope.data.searchInput = $element.find('#search');
          $scope.data.searchInput.bind('keyup', function keyup() {
            $scope.data.searchText = $scope.data.searchInput.val();
            $scope.data.FPTree.rules = [$scope.data.searchText];
            $scope.$digest();
          });
        };

        $scope.update = function update(source) {
          var treeProps = $scope.data.tree;

          // Compute the new tree layout.
          var nodes = treeProps.tree.nodes(treeProps.root).reverse();
          var links = treeProps.tree.links(nodes);
          var node = null;
          var nodeEnter = null;

          // Normalize for fixed-depth.
          nodes.forEach(function forEachNode(pd) { 
            pd.y = pd.depth * 180; 
          });

          // Update the nodes…
          node = treeProps.svg.selectAll('g.node').data(nodes, function nodesData(pd) { 
            return pd.id || (pd.id = ++treeProps.i); 
          });

          // Enter any new nodes at the parent's previous position.
          nodeEnter = node.enter().append('g').attr('class', 'node').attr('transform', function(d) { 
            return 'translate(' + source.y0 + ',' + source.x0 + ')'; 
          }).on('click', $scope.click);

          nodeEnter.append('circle').attr('r', 1e-6).style('fill', function(d) { 
            return d._children ? 'lightsteelblue' : '#fff'; 
          });

          nodeEnter.append('text').attr('x', function(d) { 
            return d.children || d._children ? -10 : 10; 
          }).attr('dy', '-0.75em').attr('text-anchor', function(d) { 
            return d.children || d._children ? 'end' : 'start'; 
          }).text(function(d) { 
            if( d.name == 'root' )
                return d.name;
            return d.name + ':' + d.count; 
          }).style('fill-opacity', 1e-6);

          // Transition nodes to their new position.
          var nodeUpdate = node.transition().duration(treeProps.duration).attr('transform', function(d) { 
            return 'translate(' + d.y + ',' + d.x + ')'; 
          });

          nodeUpdate.select('circle').attr('r', 8 ).style('fill', function(d) { 
            return d._children ? 'lightsteelblue' : '#fff'; 
          });

          nodeUpdate.select('text').style('fill-opacity', 1);

          // Transition exiting nodes to the parent's new position.
          var nodeExit = node.exit().transition().duration(treeProps.duration).attr('transform', function(d) { 
            return 'translate(' + source.y + ',' + source.x + ')'; 
          }).remove();

          nodeExit.select('circle').attr('r', 1e-6);
          nodeExit.select('text').style('fill-opacity', 1e-6);

          // Update the links…
          var link = treeProps.svg.selectAll('path.link').data(links, function(d) { 
            return d.target.id; 
          });

          // Enter any new links at the parent's previous position.
          link.enter().insert('path', 'g').attr('class', 'link').attr('d', function(d) {
            var o = {
              x: source.x0, 
              y: source.y0,
            };
            return treeProps.diagonal({
              source: o, 
              target: o,
            });
          });

          // Transition links to their new position.
          link.transition().duration(treeProps.duration).attr('d', treeProps.diagonal);

          // Transition exiting nodes to the parent's new position.
          link.exit().transition().duration(treeProps.duration).attr('d', function(d) {
            var o = {x: source.x, y: source.y};
            return treeProps.diagonal({source: o, target: o});
          })
            .remove();

          // Stash the old positions for transition.
          nodes.forEach(function(d) {
            d.x0 = d.x;
            d.y0 = d.y;
          });
        };

        // Toggle children on click.
        $scope.click = function click(d) {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } 
          else {
            d.children = d._children;
            d._children = null;
          }

          $scope.update(d);
        };

        LoadedFile.loaded = function loaded(newVal, oldVal) {
          if (newVal) {
            $scope.data.FPTree = JSON.parse(newVal);
            $scope.data.FPTree.rules = $scope.data.FPTree.rules.sort(function(a,b){
              if (b.length > a.length) {
                return 1;
              }

              if (b.length < a.length) {
                return -1;
              }

              return b[b.length-1] - a[a.length-1];
            }).map(function(a) {
              var support = a.pop();
              return {
                elements: a,
                support: support,
              };
            });

            if( $scope.data.FPTree.fullRules ){
              $scope.data.FPTree.fullRules = $scope.data.FPTree.fullRules.sort(function(a,b){
                  if( b.when.length > a.when.length )
                      return 1;
                  if( b.when.length < a.when.length )
                      return -1;

                  return b.confidence - a.confidence;
              });
            }

            setTimeout(function(){
                $scope.drawTree();
            }, 100);
          }
        };

        LoadedFile.reload = function reload() {
          window.location.reload();
        };

        $scope.drawTree(); 
      },
    ],
  };
}]);
