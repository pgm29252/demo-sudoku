window.addEventListener('DOMContentLoaded', function () {
  onCreateElementBlockSudoku();
});

const onCreateElementBlockSudoku = () => {
  const SIZE = 9;
  const SUB_SIZE = 3;
  const groups = createMatrixGroups(SIZE, SUB_SIZE);
  const container = document.createElement('div');
  container.classList.add('container-sudoku');
  container.style.display = 'grid';
  container.style.gridTemplateColumns = new Array(SUB_SIZE)
    .fill()
    .map(() => 'auto')
    .join(' ');

  console.log('group::', groups);

  for (const items of groups) {
    const groupBlock = document.createElement('div');
    groupBlock.classList.add('group-block-sudoku');
    groupBlock.style.display = 'grid';
    groupBlock.style.gridTemplateColumns = new Array(SUB_SIZE)
      .fill()
      .map(() => 'auto')
      .join(' ');

    for (const _ of items) {
      const block = this.document.createElement('button');
      block.classList.add('item-block-sudoku');
      block.innerHTML = '';
      block.onkeydown = function (e) {
        if (e.key === 'Backspace') {
          block.innerHTML = '';
          return;
        }
        if (!isNaN(Number(e.key))) {
          block.innerHTML = e.key;
        }
      };
      groupBlock.appendChild(block);
    }
    container.appendChild(groupBlock);
  }

  document.body.appendChild(container);
};

const createMatrixGroups = (size, subSize) => {
  const SIZE = size;
  const SUB_SIZE = subSize;
  const matrix = new Array(SIZE)
    .fill(undefined)
    .map((_, index) =>
      new Array(SIZE)
        .fill(index + 1)
        .map((_, childIndex) => `top: ${index + 1} <br>left: ${childIndex + 1}`)
    );
  const groups = new Array(SIZE).fill(undefined).map(() => []);

  const pointer = {
    topCountReset: 0,
    topReset: 0,
    top: 0,
    topSize: 0,
    left: 0,
    leftSize: SUB_SIZE,
    count: 0,
    group: 1,
  };

  for (let group = 0; group < SIZE; group++) {
    for (let member = 0; member < SIZE; member++) {
      pointer.count++;
      groups[group].push({
        row: pointer.top,
        col: pointer.left,
        group: pointer.group,
        matrix: matrix[pointer.top][pointer.left],
      });

      if (pointer.left + 1 === pointer.leftSize) {
        pointer.left = pointer.leftSize - SUB_SIZE;
        if (pointer.topSize + 1 === pointer.leftSize) {
          pointer.left = pointer.leftSize;
          pointer.leftSize = pointer.leftSize + SUB_SIZE;
          pointer.topSize = pointer.leftSize - SUB_SIZE;
          pointer.top = pointer.topReset;
        } else {
          pointer.top++;
          pointer.topSize++;
        }
      } else {
        pointer.left++;
      }
    }

    if (pointer.count === SIZE) {
      pointer.group = pointer.group + 1;
    }

    if (pointer.count === SUB_SIZE * SIZE) {
      pointer.count = 0;
      pointer.topCountReset = pointer.topCountReset + 1;
      pointer.topReset = SUB_SIZE * pointer.topCountReset;
      pointer.top = SUB_SIZE * pointer.topCountReset;
      pointer.left = 0;
      pointer.topSize = 0;
      pointer.leftSize = SUB_SIZE;
    }
  }

  return groups;
};
