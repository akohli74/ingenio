var queue = [];

function Node(data) {
  this.parent = null;
  this.children = [];

  if(data && data.categoryId) {
    this.categoryId = data.categoryId;
  }

  if(data && data.name) {
    this.name = data.name;
  }

  if(data && data.keywords) {
    this.keywords = data.keywords;
  }
}

function Tree(data) {
  this.parent = null;
  this.root = new Node(data);
}

// create the tree and populate the first level of children.
var tree = new Tree({ categoryId: -1, name: '', keywords: ''});
var node100 = new Node({categoryId: 100, name: 'Business', keywords: 'Money'});
var node200 = new Node({categoryId: 200, name: 'Tutoring', keywords: 'Teaching'});
tree.root.children.push(node100);
tree.root.children.push(node200);
node100.parent = tree;
node200.parent = tree;

// now populate the second level
var node101 = new Node({categoryId: 101, name: 'Accounting', keywords: 'Teaching'});
var node102 = new Node({categoryId: 102, name: 'Taxation', keywords: null});
node100.children.push(node101);
node101.parent = node100;
node100.children.push(node102);
node102.parent = node100;
var node201 = new Node({categoryId: 201, name: 'Computer', keywords: null});
var node202 = new Node({categoryId: 202, name: 'Operating System', keywords: null});
node201.parent = node200;
node202.parent = node201;
node200.children.push(node201);
node200.children.push(node202);

// populate the third level
var node103 = new Node({categoryId: 103, name: 'Corporate Tax', keywords: null});
var node109 = new Node({categoryId: 109, name: 'Small business Tax', keywords: null});
node101.children.push(node103);
node103.parent = node101;
node101.children.push(node109);
node109.parent = node101;

Tree.prototype.find = function(data) {
  queue = [];
  queue.push(tree.root);
  var myTree = queue.pop();

  while(myTree) {
    if(myTree.children) {
      for(var i = 0; i < myTree.children.length; i++) {
        queue.push(myTree.children[i]);
      }
    }

    myTree = queue.pop();
    if(myTree && myTree.categoryId === data) {
      return myTree;
    }
  }
}

Tree.prototype.getNodesAtLevel = function(node, current, level, result) {
  debugger;
  if(current === level) {
    result.push(node);
  } else {
    for(var i = 0; i < node.children.length; i++) {
      tree.getNodesAtLevel(node.children[i], current+1, level, result);
    }
  }
}

var input = parseInt(process.argv[2]);

console.log('\n================Output================\n\n')

if(input > 99) {
  var node = tree.find(input);

  if(node.parent) {
    console.log('CategoryId: ' + node.categoryId);
    console.log('ParentCategoryID: ' + node.parent.categoryId);
    console.log('Name: ' + node.name);
  }

  var keywords;
  while(!node.keywords) {
    node = node.parent;
  }

  console.log('Keywords: ' + node.keywords);
} else {
  var levelNodes = [];
  tree.getNodesAtLevel(tree.root, 0, input, levelNodes);
  for(var i = 0; i < levelNodes.length; i++) {
    console.log('Level: ' + input + '  CategoryId: ' + levelNodes[i].categoryId);
  }
}

console.log('\n\n');
