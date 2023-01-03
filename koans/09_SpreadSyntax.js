describe('Spread syntax에 대해 학습합니다.', function () {
  it('전개 문법(spread syntax)을 학습합니다.', function () {
    const spread = [1, 2, 3];
    // TODO: 전개 문법을 사용해 테스트 코드를 완성합니다. spread를 지우지 않고 해결할 수 있습니다.
    const arr = [0, spread, 4];
    expect(arr).to.deep.equal([0, [1, 2, 3], 4]);
  });

  it('빈 배열에 전개 문법을 사용할 경우, 아무것도 전달되지 않습니다.', function () {
    const spread = [];
    // TODO: 전개 문법을 사용해 테스트 코드를 완성합니다. spread를 지우지 않고 해결할 수 있습니다.
    const arr = [0, spread, 1];
    expect(arr).to.deep.equal([0, [], 1]);
  });

  it('여러 개의 배열을 이어붙일 수 있습니다.', function () {
    const arr1 = [0, 1, 2];
    const arr2 = [3, 4, 5];
    const concatenated = [0, 1, 2, 3, 4, 5];
    expect(concatenated).to.deep.equal([0, 1, 2, 3, 4, 5]);
    // 아래 코드도 같은 동작을 수행합니다.
    //  arr1.concat(arr2);
  });

  it('여러 개의 객체를 병합할 수 있습니다.', function () {
    const fullPre = {
      cohort: 7,
      duration: 4,
      mentor: 'hongsik',
    };

    const me = {
      time: '0156',
      status: 'sleepy',
      todos: ['coplit', 'koans'],
    };

    const merged = {cohort: 7,
      duration: 4,
      mentor: 'hongsik',
      time: '0156',
      status: 'sleepy',
      todos: ['coplit', 'koans'],};
    // 변수 'merged'에 할당된 것은 'obj1'과 'obj2'의 value일까요, reference일까요?
    // 만약 값(value, 데이터)이 복사된 것이라면, shallow copy일까요, deep copy일까요?

    expect(merged).to.deep.equal({
      cohort: 7,
      duration: 4,
      mentor: 'hongsik',
      time: '0156',
      status: 'sleepy',
      todos: ['coplit', 'koans'],
    });
  });

  it('Rest Parameter는 함수의 전달인자를 배열로 다룰 수 있게 합니다.', function () {
    // 자바스크립트는 (named parameter를 지원하지 않기 때문에) 함수 호출 시 전달인자의 순서가 중요합니다.
    function returnFirstArg(firstArg) {
      return firstArg;
    }
    expect(returnFirstArg('first', 'second', 'third')).to.equal('first'); //매개변수를 하나만 받아서 값도 맨처음 하나

    function returnSecondArg(firstArg, secondArg) {
      return secondArg; //매개변수를 두번째꺼만 받는다
    }
    expect(returnSecondArg('only give first arg')).to.equal(undefined);
    //매개변수 2번째꺼만 받으므로 첫번째꺼만 있다면 값이 정의되지 않았다.

    // rest parameter는 spread syntax를 통해 간단하게 구현됩니다.
    function getAllParamsByRestParameter(...args) {
      return args; //나머지는 배열의 형태로 묶여서 출력된다.
    }

    // arguments를 통해 '비슷하게' 함수의 전달인자들을 다룰 수 있습니다. (spread syntax 도입 이전)
    // arguments는 모든 함수의 실행 시 자동으로 생성되는 '객체'입니다.
    function getAllParamsByArgumentsObj() {
      return arguments; //index가 속성, 매개변수가 값이 되는 객체 생성!!!
    }

    const restParams = getAllParamsByRestParameter('first', 'second', 'third');
    const argumentsObj = getAllParamsByArgumentsObj('first', 'second', 'third');

    expect(restParams).to.deep.equal(['first', 'second', 'third']);
    expect(Object.keys(argumentsObj)).to.deep.equal(['0', '1', '2']); //index가 객체의 속성값이 된다
    expect(Object.values(argumentsObj)).to.deep.equal(['first', 'second', 'third']); //매개변수는 객체의 값이 된다.

    // arguments와 rest parameter를 통해 배열로 된 전달인자(args)의 차이를 확인하시기 바랍니다.
    expect(restParams === argumentsObj).to.deep.equal(false); //배열상태 !==객체상태
    expect(typeof restParams).to.deep.equal("object"); //배열
    expect(typeof argumentsObj).to.deep.equal("object"); //객체
    expect(Array.isArray(restParams)).to.deep.equal(true); //배열
    expect(Array.isArray(argumentsObj)).to.deep.equal(false); //객체

    const argsArr = Array.from(argumentsObj); //객체가 키가없어지고 값만 남은 배열로 변한다
    expect(Array.isArray(argsArr)).to.deep.equal(true); //배열상태
    expect(argsArr).to.deep.equal(['first', 'second', 'third']); //값만 표시되는 배열
    expect(argsArr === restParams).to.deep.equal(false); //결과값이 같더라도 주소가 다르다
  });

  it('Rest Parameter는 전달인자의 수가 정해져 있지 않은 경우에도 유용하게 사용할 수 있습니다.', function () {
    function sum(...nums) {
      let sum = 0;
      for (let i = 0; i < nums.length; i++) {
        sum = sum + nums[i];
      }
      return sum;
    }
    expect(sum(1, 2, 3)).to.equal(6); 
    expect(sum(1, 2, 3, 4)).to.equal(10);
  });

  it('Rest Parameter는 전달인자의 일부에만 적용할 수도 있습니다.', function () {
    // rest parameter는 항상 배열입니다.
    function getAllParams(required1, required2, ...args) {
      return [required1, required2, args];
    }
    expect(getAllParams(123)).to.deep.equal([123, undefined, []]);

    function makePizza(dough, name, ...toppings) {
      const order = `You ordered ${name} pizza with ${dough} dough and ${toppings.length} extra toppings!`;
      return order;
    }
    expect(makePizza('original')).to.equal("You ordered undefined pizza with original dough and 0 extra toppings!");
    expect(makePizza('thin', 'pepperoni')).to.equal("You ordered pepperoni pizza with thin dough and 0 extra toppings!");
    expect(makePizza('napoli', 'meat', 'extra cheese', 'onion', 'bacon')).to.equal("You ordered meat pizza with napoli dough and 3 extra toppings!");
  });
});
