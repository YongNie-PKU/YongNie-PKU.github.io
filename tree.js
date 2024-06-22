//  DOMContentLoaded 事件监听器，在初始HTML文档被完全加载和解析后触发
document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            let sidebar = document.getElementById('sidebar');
            // createList 函数递归地创建列表元素
            // appendChild向指定父节点的子节点列表末尾添加一个新的子节点
            // 此处将tree的所有数据加入sidebar中
            sidebar.appendChild(createList(data.tree));
            bindToggleEvents();
        })
        .catch(error => {
            console.error('Failed to load data:', error);
        });

    let lastClickedButton = null;

    function handleButtonClick(event) {
        if (lastClickedButton) {
            lastClickedButton.classList.remove('clicked');
        }
        event.target.classList.add('clicked');
        lastClickedButton = event.target;
    }

    function createList(items, isRoot = true) {
        let ul = document.createElement('ul');
        if (!isRoot) {  // 检测是否为根节点，不是则默认不显示
            ul.style.display = 'none';  // Set the style to display: none for nested elements
        }
        items.forEach(item => {
            let li = document.createElement('li');  // li 元素通常用在有序列表（<ol>）或无序列表（<ul>）中，用来定义列表中的每个项目。
            li.innerHTML = `<span class="toggle-btn" data-expanded="false">+</span>${item.name} <button type="submit" value="${item.name}" class="buttontheom">&nbsp;</button>`;

            // 给节点button添加事件监听器
            let button = li.querySelector('button.buttontheom');
            button.addEventListener('click', handleButtonClick);


            // 递归创建子节点，若存在子节点且其数量大于0
            if (item.children && item.children.length > 0) {
                let nestedUl = createList(item.children, false);
                li.appendChild(nestedUl);
            }
            ul.appendChild(li); // 将ul元素加入列表
        });
        return ul;
    }

    document.body.appendChild();

    function toggleNode(event) {
        let btn = event.target;
        // expand是布尔值，检测data-expanded属性(是否展开)是否为真
        // === 是一个严格相等运算符。它用于比较两个值是否相等，同时还要求这两个值的类型必须相同
        let expanded = btn.getAttribute('data-expanded') === 'true';
        // 为真改为收回，为假展开
        btn.setAttribute('data-expanded', !expanded);
        // 为真状态改为+，为假改为-
        btn.innerText = expanded ? '+' : '-';
        // 获取按钮的临近的临近元素,是一个ul元素，无序列表
        let nextUl = btn.nextElementSibling.nextElementSibling;
        // console.table(nextUl.tagName)调试，查看元素类型
        // 检测是否存在子元素以及其是否为ul元素，为真则展示子菜单（将css样式改为无）
        if (nextUl && nextUl.tagName === 'UL') {
            nextUl.style.display = expanded ? 'none' : 'block';
        }
        // stopPropagation 是 JavaScript 中 Event 对象的方法，用于阻止事件传播到父元素。
        event.stopPropagation();
    }

    function bindToggleEvents() {
        // 为文档中所有具有 toggle-btn 类名的元素添加点击事件监听器，
        // 当这些元素被点击时，执行 toggleNode 函数。
        // .是类选择器
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', toggleNode);
        });
    }

});





