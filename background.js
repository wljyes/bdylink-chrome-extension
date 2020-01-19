chrome.contextMenus.create({
    title:'用百度云打开',
    contexts:['selection'], //选中文字时才会出现此右键菜单
    onclick: function(params)
    {
        var reg = /([0-9a-zA-Z-_]+)(?:[^0-9a-zA-Z]+)?([a-zA-Z]{4})?/;
        var matches = reg.exec(params.selectionText);
        if (matches.length == 0) {
            //regex not match any string, maybe the selected string isn't a baidu pan link
            //do nothing
        } else if (matches.length == 2) {
            //this means the link is without a verify code
            var link_suffix = matches[1];
            //just jump to the pan.baidu.com/s/$link_suffix
            chrome.tabs.create({url:'https://pan.baidu.com/s/' + link_suffix});
        } else if (matches.length == 3) {
            //this means the link has a verify code
            chrome.tabs.create({url:'https://pan.baidu.com/s/' + matches[1]});
            document.getElementById("wkwj9A").innerText = matches[2];
        }
    }
})