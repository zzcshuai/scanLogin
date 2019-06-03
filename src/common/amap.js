/*
 * @Author: zackzxy 
 * @Date: 2019-05-31 16:40:00 
 * @Last Modified by: zackzxy
 * @Last Modified time: 2019-05-31 16:40:27
 */
//高德地图定位
export default function MapLoader() {   // <-- 原作者这里使用的是module.exports
    return new Promise((resolve, reject) => {
        if (window.AMap) {
            resolve(window.AMap)
        } else {
            var script = document.createElement('script')
            script.type = 'text/javascript'
            script.async = true
            script.src = '//webapi.amap.com/maps?v=1.4.6&key=a4b7b21b2da76b28d65c4126194c1e3c'
            script.onerror = reject
            document.head.appendChild(script)
        }
        window.initAMap = () => {
            resolve(window.AMap)
        }
    })
}