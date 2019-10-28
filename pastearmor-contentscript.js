function Warning(innerHTML, moreStyle)
{
    this.element = null

    var that = this

    this.delete = function() {
        that.element.remove()
    }

    function init()
    {
        let ele = document.createElement("div")
        ele.style = "position: fixed; float: left; left: 0; top: 0; background: orange; color: black; font-family: courier; font-size: 18px; " + moreStyle
        ele.innerHTML = innerHTML
        document.body.appendChild(ele)
        that.element = ele

        document.addEventListener("mousemove", (e) => onMouseMove(e))
    }
    function onMouseMove(e)
    {
        that.element.style.left = (e.clientX + 10) + 'px'
        that.element.style.top = (e.clientY - 5) + 'px'
    }

    init()
}

function PasteArmor(dangers, showTime=2000)
{
    this.warning = null

    var that = this
    var timeout = null
    
    function init()
    {
        document.addEventListener("copy", (e) => {
            let selected = document.getSelection().toString()
            let danger = checkText(selected)
            let content = `${selected.length} chars `
            if (danger)
                content += `Malicious ${danger}`
            showWarning(content, "background: " + (danger ? "red" : "orange"))
            timeout = setTimeout(hideWarning, showTime)
        })
    }
    function checkText(text) // check whether the text is malicious or not and return the type of danger
    {
        for (i in dangers)
        {
            if (dangers[i](text))
            {
                return i
            }
        }
        return null
    }
    function hideWarning()
    {
        that.warning.delete()
        that.warning = null
    }
    function showWarning(...args)
    {
        if (timeout)
            clearTimeout(timeout)
        if (that.warning)
            hideWarning()
        that.warning = new Warning(...args)
    }

    init()
}

dangers = { // danger functions
    template: function(text) {
        // return true // if something malicious found in this copied text
        return false
    }
}
pastearmor = new PasteArmor(dangers)