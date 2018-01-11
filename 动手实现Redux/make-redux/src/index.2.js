const appState = {
    title: {
        text: 'React.js 小书',
        color: 'red'
    },
    content: {
        text: 'React.js 小书内容',
        color: 'blue'
    }
}

function createStore(state, stateChanger) {
    const listeners = []
    const subscribe = (listener) => listeners.push(listener) // 观察者模式
    const getState = () => state
    const dispatch = (action) => {
        stateChanger(state, action)
        listeners.forEach((listener) => listener()) // 每次dispatch都会触发
    }
    return { getState, dispatch, subscribe }
}

function stateChanger(state, action) {
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            state.title.text = action.text
            break
        case 'UPDATE_TITLE_COLOR':
            state.title.color = action.color
            break
        default:
            break
    }
}

const store = createStore(appState, stateChanger)
store.subscribe(() => renderApp(store.getState())) // 设置监听


function renderApp(appState) {
    renderTitle(appState.title)
    renderContent(appState.content)
}

function renderTitle(title) {
    const titleDOM = document.querySelector('.title')
    titleDOM.innerHTML = title.text
    titleDOM.style.color = title.color
}

function renderContent(content) {
    const contentDOM = document.querySelector('.content')
    contentDOM.innerHTML = content.text
    contentDOM.style.color = content.color
}

// 首次渲染页面
renderApp(store.getState())

// dispatch方法更新数据
store.dispatch({type: 'UPDATE_TITLE_TEXT', text: 'Vue.js 小书内容'})
store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'yellow'})

// 利用观察者模式，重新渲染可以省略
// renderApp(store.getState())
