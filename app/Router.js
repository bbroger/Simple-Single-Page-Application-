class Router {
    constructor(options) {
        this.options = options;
        this._routeCache = {};
    }

    getContent(hashId, callback) {
        if (this.routeCache[hashId]) {
            callback(this.routeCache[hashId]);
        } else {
            FileRequest.fetchFile(this.options.routes[hashId].path, (content) => {
                this.routeCache[hashId] = content;
                callback(content);
            })
        }
    }

    changeRoute() {
        let contentEl = this.options.contentEl;
        const hashId = window.location.hash.substr(1);
        console.log(hashId);
        this.getContent(hashId, (content) => {
            contentEl.innerHTML = content;
        })

        this.setActiveLink(hashId);

    }

    init() {



        if (!window.location.hash) {
            window.location.hash = "#home";
            console.log('n tem')
        }

        this.changeRoute();
        window.addEventListener("hashchange", () => {
            this.changeRoute()
        });
    }

    setActiveLink(hashId) {
        let links = document.querySelectorAll("a[active-class]");
        let link;
        let currentPage;
        let className;

        for (let i = 0; i < links.length; i++) {
            link = links[i];
            currentPage = link.getAttribute('href').substr(1);
            className = link.getAttribute('active-class');
            if (currentPage === hashId) {
                link.classList.add(className);
            } else {
                link.classList.remove(className);
            }
        }
    }

    set routeCache(val) {
        return this._routeCache = val;
    }
    get routeCache() {
        return this._routeCache;
    }

}