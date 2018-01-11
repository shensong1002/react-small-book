// 创建store，返回三个方法getState、dispatch、subscribe
function createStore(reducer) {
    let state = null
    const listeners = []
    const subscribe = (listener) => listeners.push(listener) // 向观察者数组中push函数
    const getState = () => state
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener()) // 每次dispatch都会触发
    }
    dispatch({}) // 初始化 state
    return { getState, dispatch, subscribe }
}

function reducer(state, action) {
    if(!state) {
        return {
            title: {
                text: 'React.js 小书',
                color: 'red'
            },
            content: {
                text: 'React.js 小书内容',
                color: 'blue'
            }
        }
    }

    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            return {
                ...state,
                title: {
                    ...state.title,
                    text: action.text
                }
            }
        case 'UPDATE_TITLE_COLOR':
            return {
                ...state,
                title: {
                    ...state.title,
                    color: action.color
                }
            }
        default:
            return state
    }
}

function renderApp(newAppState, oldAppState={}) {
    if(newAppState === oldAppState) return
    console.log('render app...')
    renderTitle(newAppState.title, oldAppState.title)
    renderContent(newAppState.content, oldAppState.content)
}

function renderTitle(newTitle, oldTitle={}) {
    if(newTitle === oldTitle) return
    console.log('render title...')
    const titleDOM = document.querySelector('.title')
    titleDOM.innerHTML = newTitle.text
    titleDOM.style.color = newTitle.color
}

function renderContent(newContent, oldContent={}) {
    if(newContent === oldContent) return
    console.log('render content...')
    const contentDOM = document.querySelector('.content')
    contentDOM.innerHTML = newContent.text
    contentDOM.style.color = newContent.color
}

const store = createStore(reducer)
let oldState = store.getState() // 记录旧数据
store.subscribe(() => { // 设置监听
    const newState = store.getState()
    renderApp(newState, oldState)
    oldState = newState
})

// 首次渲染页面
renderApp(store.getState())

// dispatch方法更新数据
store.dispatch({type: 'UPDATE_TITLE_TEXT', text: 'Vue.js 小书内容'})
store.dispatch({type: 'UPDATE_TITLE_COLOR', color: 'yellow'})
