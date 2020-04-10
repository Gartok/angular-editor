/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@angular/common";
/**
 * @record
 */
export function UploadResponse() { }
if (false) {
    /** @type {?} */
    UploadResponse.prototype.imageUrl;
}
var AngularEditorService = /** @class */ (function () {
    function AngularEditorService(http, doc) {
        var _this = this;
        this.http = http;
        this.doc = doc;
        /**
         * save selection when the editor is focussed out
         */
        this.saveSelection = (/**
         * @return {?}
         */
        function () {
            if (_this.doc.getSelection) {
                /** @type {?} */
                var sel = _this.doc.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    _this.savedSelection = sel.getRangeAt(0);
                    _this.selectedText = sel.toString();
                }
            }
            else if (_this.doc.getSelection && _this.doc.createRange) {
                _this.savedSelection = document.createRange();
            }
            else {
                _this.savedSelection = null;
            }
        });
    }
    /**
     * Executed command from editor header buttons exclude toggleEditorMode
     * @param command string from triggerCommand
     */
    /**
     * Executed command from editor header buttons exclude toggleEditorMode
     * @param {?} command string from triggerCommand
     * @return {?}
     */
    AngularEditorService.prototype.executeCommand = /**
     * Executed command from editor header buttons exclude toggleEditorMode
     * @param {?} command string from triggerCommand
     * @return {?}
     */
    function (command) {
        /** @type {?} */
        var commands = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'];
        if (commands.includes(command)) {
            this.doc.execCommand('formatBlock', false, command);
            return;
        }
        this.doc.execCommand(command, false, null);
    };
    /**
     * Create URL link
     * @param url string from UI prompt
     */
    /**
     * Create URL link
     * @param {?} url string from UI prompt
     * @return {?}
     */
    AngularEditorService.prototype.createLink = /**
     * Create URL link
     * @param {?} url string from UI prompt
     * @return {?}
     */
    function (url) {
        if (!url.includes('http')) {
            this.doc.execCommand('createlink', false, url);
        }
        else {
            /** @type {?} */
            var newUrl = '<a href="' + url + '" target="_blank">' + this.selectedText + '</a>';
            this.insertHtml(newUrl);
        }
    };
    /**
     * Create URL link
     * @param url string from UI prompt
     */
    /**
     * Create URL link
     * @param {?} url string from UI prompt
     * @return {?}
     */
    AngularEditorService.prototype.insertSlide = /**
     * Create URL link
     * @param {?} url string from UI prompt
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var newUrl = '<div class="collapse multi-collapse" id="' + url + '">' + this.selectedText + '</div>';
        this.insertHtml(newUrl);
    };
    /**
     * insert color either font or background
     *
     * @param color color to be inserted
     * @param where where the color has to be inserted either text/background
     */
    /**
     * insert color either font or background
     *
     * @param {?} color color to be inserted
     * @param {?} where where the color has to be inserted either text/background
     * @return {?}
     */
    AngularEditorService.prototype.insertColor = /**
     * insert color either font or background
     *
     * @param {?} color color to be inserted
     * @param {?} where where the color has to be inserted either text/background
     * @return {?}
     */
    function (color, where) {
        /** @type {?} */
        var restored = this.restoreSelection();
        if (restored) {
            if (where === 'textColor') {
                this.doc.execCommand('foreColor', false, color);
            }
            else {
                this.doc.execCommand('hiliteColor', false, color);
            }
        }
    };
    /**
     * Set font name
     * @param fontName string
     */
    /**
     * Set font name
     * @param {?} fontName string
     * @return {?}
     */
    AngularEditorService.prototype.setFontName = /**
     * Set font name
     * @param {?} fontName string
     * @return {?}
     */
    function (fontName) {
        this.doc.execCommand('fontName', false, fontName);
    };
    /**
     * Set font size
     * @param fontSize string
     */
    /**
     * Set font size
     * @param {?} fontSize string
     * @return {?}
     */
    AngularEditorService.prototype.setFontSize = /**
     * Set font size
     * @param {?} fontSize string
     * @return {?}
     */
    function (fontSize) {
        this.doc.execCommand('fontSize', false, fontSize);
    };
    /**
     * Create raw HTML
     * @param html HTML string
     */
    /**
     * Create raw HTML
     * @param {?} html HTML string
     * @return {?}
     */
    AngularEditorService.prototype.insertHtml = /**
     * Create raw HTML
     * @param {?} html HTML string
     * @return {?}
     */
    function (html) {
        /** @type {?} */
        var isHTMLInserted = this.doc.execCommand('insertHTML', false, html);
        if (!isHTMLInserted) {
            throw new Error('Unable to perform the operation');
        }
    };
    /**
     * restore selection when the editor is focused in
     *
     * saved selection when the editor is focused out
     */
    /**
     * restore selection when the editor is focused in
     *
     * saved selection when the editor is focused out
     * @return {?}
     */
    AngularEditorService.prototype.restoreSelection = /**
     * restore selection when the editor is focused in
     *
     * saved selection when the editor is focused out
     * @return {?}
     */
    function () {
        if (this.savedSelection) {
            if (this.doc.getSelection) {
                /** @type {?} */
                var sel = this.doc.getSelection();
                sel.removeAllRanges();
                sel.addRange(this.savedSelection);
                return true;
            }
            else if (this.doc.getSelection /*&& this.savedSelection.select*/) {
                // this.savedSelection.select();
                return true;
            }
        }
        else {
            return false;
        }
    };
    /**
     * setTimeout used for execute 'saveSelection' method in next event loop iteration
     */
    /**
     * setTimeout used for execute 'saveSelection' method in next event loop iteration
     * @param {?} callbackFn
     * @param {?=} timeout
     * @return {?}
     */
    AngularEditorService.prototype.executeInNextQueueIteration = /**
     * setTimeout used for execute 'saveSelection' method in next event loop iteration
     * @param {?} callbackFn
     * @param {?=} timeout
     * @return {?}
     */
    function (callbackFn, timeout) {
        if (timeout === void 0) { timeout = 1e2; }
        setTimeout(callbackFn, timeout);
    };
    /** check any selection is made or not */
    /**
     * check any selection is made or not
     * @private
     * @return {?}
     */
    AngularEditorService.prototype.checkSelection = /**
     * check any selection is made or not
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selectedText = this.savedSelection.toString();
        if (selectedText.length === 0) {
            throw new Error('No Selection Made');
        }
        return true;
    };
    /**
     * Upload file to uploadUrl
     * @param file The file
     */
    /**
     * Upload file to uploadUrl
     * @param {?} file The file
     * @return {?}
     */
    AngularEditorService.prototype.uploadImage = /**
     * Upload file to uploadUrl
     * @param {?} file The file
     * @return {?}
     */
    function (file) {
        /** @type {?} */
        var uploadData = new FormData();
        uploadData.append('file', file, file.name);
        return this.http.post(this.uploadUrl, uploadData, {
            reportProgress: true,
            observe: 'events',
        });
    };
    /**
     * Insert image with Url
     * @param imageUrl The imageUrl.
     */
    /**
     * Insert image with Url
     * @param {?} imageUrl The imageUrl.
     * @return {?}
     */
    AngularEditorService.prototype.insertImage = /**
     * Insert image with Url
     * @param {?} imageUrl The imageUrl.
     * @return {?}
     */
    function (imageUrl) {
        this.doc.execCommand('insertImage', false, imageUrl);
    };
    /**
     * @param {?} separator
     * @return {?}
     */
    AngularEditorService.prototype.setDefaultParagraphSeparator = /**
     * @param {?} separator
     * @return {?}
     */
    function (separator) {
        this.doc.execCommand('defaultParagraphSeparator', false, separator);
    };
    /**
     * @param {?} customClass
     * @return {?}
     */
    AngularEditorService.prototype.createCustomClass = /**
     * @param {?} customClass
     * @return {?}
     */
    function (customClass) {
        /** @type {?} */
        var newTag = this.selectedText;
        if (customClass) {
            /** @type {?} */
            var tagName = customClass.tag ? customClass.tag : 'span';
            newTag = '<' + tagName + ' class="' + customClass.class + '">' + this.selectedText + '</' + tagName + '>';
        }
        this.insertHtml(newTag);
    };
    /**
     * @param {?} videoUrl
     * @return {?}
     */
    AngularEditorService.prototype.insertVideo = /**
     * @param {?} videoUrl
     * @return {?}
     */
    function (videoUrl) {
        if (videoUrl.match('www.youtube.com')) {
            this.insertYouTubeVideoTag(videoUrl);
        }
        if (videoUrl.match('vimeo.com')) {
            this.insertVimeoVideoTag(videoUrl);
        }
    };
    /**
     * @private
     * @param {?} videoUrl
     * @return {?}
     */
    AngularEditorService.prototype.insertYouTubeVideoTag = /**
     * @private
     * @param {?} videoUrl
     * @return {?}
     */
    function (videoUrl) {
        /** @type {?} */
        var id = videoUrl.split('v=')[1];
        /** @type {?} */
        var imageUrl = "https://img.youtube.com/vi/" + id + "/0.jpg";
        /** @type {?} */
        var thumbnail = "\n      <div style='position: relative'>\n        <img style='position: absolute; left:200px; top:140px'\n             src=\"https://img.icons8.com/color/96/000000/youtube-play.png\"\n        <a href='" + videoUrl + "' target='_blank'>\n          <img src=\"" + imageUrl + "\" alt=\"click to watch\"/>\n        </a>\n      </div>";
        this.insertHtml(thumbnail);
    };
    /**
     * @private
     * @param {?} videoUrl
     * @return {?}
     */
    AngularEditorService.prototype.insertVimeoVideoTag = /**
     * @private
     * @param {?} videoUrl
     * @return {?}
     */
    function (videoUrl) {
        var _this = this;
        /** @type {?} */
        var sub = this.http.get("https://vimeo.com/api/oembed.json?url=" + videoUrl).subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var imageUrl = data.thumbnail_url_with_play_button;
            /** @type {?} */
            var thumbnail = "<div>\n        <a href='" + videoUrl + "' target='_blank'>\n          <img src=\"" + imageUrl + "\" alt=\"" + data.title + "\"/>\n        </a>\n      </div>";
            _this.insertHtml(thumbnail);
            sub.unsubscribe();
        }));
    };
    /**
     * @param {?} node
     * @return {?}
     */
    AngularEditorService.prototype.nextNode = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        if (node.hasChildNodes()) {
            return node.firstChild;
        }
        else {
            while (node && !node.nextSibling) {
                node = node.parentNode;
            }
            if (!node) {
                return null;
            }
            return node.nextSibling;
        }
    };
    /**
     * @param {?} range
     * @param {?} includePartiallySelectedContainers
     * @return {?}
     */
    AngularEditorService.prototype.getRangeSelectedNodes = /**
     * @param {?} range
     * @param {?} includePartiallySelectedContainers
     * @return {?}
     */
    function (range, includePartiallySelectedContainers) {
        /** @type {?} */
        var node = range.startContainer;
        /** @type {?} */
        var endNode = range.endContainer;
        /** @type {?} */
        var rangeNodes = [];
        // Special case for a range that is contained within a single node
        if (node === endNode) {
            rangeNodes = [node];
        }
        else {
            // Iterate nodes until we hit the end container
            while (node && node !== endNode) {
                rangeNodes.push(node = this.nextNode(node));
            }
            // Add partially selected nodes at the start of the range
            node = range.startContainer;
            while (node && node !== range.commonAncestorContainer) {
                rangeNodes.unshift(node);
                node = node.parentNode;
            }
        }
        // Add ancestors of the range container, if required
        if (includePartiallySelectedContainers) {
            node = range.commonAncestorContainer;
            while (node) {
                rangeNodes.push(node);
                node = node.parentNode;
            }
        }
        return rangeNodes;
    };
    /**
     * @return {?}
     */
    AngularEditorService.prototype.getSelectedNodes = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var nodes = [];
        if (this.doc.getSelection) {
            /** @type {?} */
            var sel = this.doc.getSelection();
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                nodes.push.apply(nodes, this.getRangeSelectedNodes(sel.getRangeAt(i), true));
            }
        }
        return nodes;
    };
    /**
     * @param {?} el
     * @return {?}
     */
    AngularEditorService.prototype.replaceWithOwnChildren = /**
     * @param {?} el
     * @return {?}
     */
    function (el) {
        /** @type {?} */
        var parent = el.parentNode;
        while (el.hasChildNodes()) {
            parent.insertBefore(el.firstChild, el);
        }
        parent.removeChild(el);
    };
    /**
     * @param {?} tagNames
     * @return {?}
     */
    AngularEditorService.prototype.removeSelectedElements = /**
     * @param {?} tagNames
     * @return {?}
     */
    function (tagNames) {
        var _this = this;
        /** @type {?} */
        var tagNamesArray = tagNames.toLowerCase().split(',');
        this.getSelectedNodes().forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            if (node.nodeType === 1 &&
                tagNamesArray.indexOf(node.tagName.toLowerCase()) > -1) {
                // Remove the node and replace it with its children
                _this.replaceWithOwnChildren(node);
            }
        }));
    };
    AngularEditorService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    AngularEditorService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    /** @nocollapse */ AngularEditorService.ngInjectableDef = i0.defineInjectable({ factory: function AngularEditorService_Factory() { return new AngularEditorService(i0.inject(i1.HttpClient), i0.inject(i2.DOCUMENT)); }, token: AngularEditorService, providedIn: "root" });
    return AngularEditorService;
}());
export { AngularEditorService };
if (false) {
    /** @type {?} */
    AngularEditorService.prototype.savedSelection;
    /** @type {?} */
    AngularEditorService.prototype.selectedText;
    /** @type {?} */
    AngularEditorService.prototype.uploadUrl;
    /**
     * save selection when the editor is focussed out
     * @type {?}
     */
    AngularEditorService.prototype.saveSelection;
    /**
     * @type {?}
     * @private
     */
    AngularEditorService.prototype.http;
    /**
     * @type {?}
     * @private
     */
    AngularEditorService.prototype.doc;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1lZGl0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brb2xrb3YvYW5ndWxhci1lZGl0b3IvIiwic291cmNlcyI6WyJsaWIvYW5ndWxhci1lZGl0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBWSxNQUFNLHNCQUFzQixDQUFDO0FBRTNELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7OztBQUd6QyxvQ0FFQzs7O0lBREMsa0NBQWlCOztBQUduQjtJQVNFLDhCQUNVLElBQWdCLEVBQ0UsR0FBUTtRQUZwQyxpQkFHSztRQUZLLFNBQUksR0FBSixJQUFJLENBQVk7UUFDRSxRQUFHLEdBQUgsR0FBRyxDQUFLOzs7O1FBdUY3QixrQkFBYTs7O1FBQUc7WUFDckIsSUFBSSxLQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRTs7b0JBQ25CLEdBQUcsR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRTtnQkFDbkMsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUU7b0JBQ3BDLEtBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsS0FBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ3BDO2FBQ0Y7aUJBQU0sSUFBSSxLQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxLQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTtnQkFDeEQsS0FBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDOUM7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7YUFDNUI7UUFDSCxD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b0I7OztJQUUvQiw4Q0FBNkI7O0lBQzdCLDRDQUFxQjs7SUFDckIseUNBQWtCOzs7OztJQTJGbEIsNkNBWUM7Ozs7O0lBcEdDLG9DQUF3Qjs7Ozs7SUFDeEIsbUNBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwRXZlbnR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtDdXN0b21DbGFzc30gZnJvbSAnLi9jb25maWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVwbG9hZFJlc3BvbnNlIHtcbiAgaW1hZ2VVcmw6IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckVkaXRvclNlcnZpY2Uge1xuXG4gIHNhdmVkU2VsZWN0aW9uOiBSYW5nZSB8IG51bGw7XG4gIHNlbGVjdGVkVGV4dDogc3RyaW5nO1xuICB1cGxvYWRVcmw6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2M6IGFueVxuICApIHsgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlZCBjb21tYW5kIGZyb20gZWRpdG9yIGhlYWRlciBidXR0b25zIGV4Y2x1ZGUgdG9nZ2xlRWRpdG9yTW9kZVxuICAgKiBAcGFyYW0gY29tbWFuZCBzdHJpbmcgZnJvbSB0cmlnZ2VyQ29tbWFuZFxuICAgKi9cbiAgZXhlY3V0ZUNvbW1hbmQoY29tbWFuZDogc3RyaW5nKSB7XG4gICAgY29uc3QgY29tbWFuZHMgPSBbJ2gxJywgJ2gyJywgJ2gzJywgJ2g0JywgJ2g1JywgJ2g2JywgJ3AnLCAncHJlJ107XG4gICAgaWYgKGNvbW1hbmRzLmluY2x1ZGVzKGNvbW1hbmQpKSB7XG4gICAgICB0aGlzLmRvYy5leGVjQ29tbWFuZCgnZm9ybWF0QmxvY2snLCBmYWxzZSwgY29tbWFuZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZG9jLmV4ZWNDb21tYW5kKGNvbW1hbmQsIGZhbHNlLCBudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgVVJMIGxpbmtcbiAgICogQHBhcmFtIHVybCBzdHJpbmcgZnJvbSBVSSBwcm9tcHRcbiAgICovXG4gIGNyZWF0ZUxpbmsodXJsOiBzdHJpbmcpIHtcbiAgICBpZiAoIXVybC5pbmNsdWRlcygnaHR0cCcpKSB7XG4gICAgICB0aGlzLmRvYy5leGVjQ29tbWFuZCgnY3JlYXRlbGluaycsIGZhbHNlLCB1cmwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXdVcmwgPSAnPGEgaHJlZj1cIicgKyB1cmwgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyArIHRoaXMuc2VsZWN0ZWRUZXh0ICsgJzwvYT4nO1xuICAgICAgdGhpcy5pbnNlcnRIdG1sKG5ld1VybCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBVUkwgbGlua1xuICAgKiBAcGFyYW0gdXJsIHN0cmluZyBmcm9tIFVJIHByb21wdFxuICAgKi9cbiAgaW5zZXJ0U2xpZGUodXJsOiBzdHJpbmcpIHtcbiAgICBjb25zdCBuZXdVcmwgPSAnPGRpdiBjbGFzcz1cImNvbGxhcHNlIG11bHRpLWNvbGxhcHNlXCIgaWQ9XCInICsgdXJsICsgJ1wiPicgKyB0aGlzLnNlbGVjdGVkVGV4dCArICc8L2Rpdj4nO1xuICAgIHRoaXMuaW5zZXJ0SHRtbChuZXdVcmwpO1xuICB9XG5cbiAgLyoqXG4gICAqIGluc2VydCBjb2xvciBlaXRoZXIgZm9udCBvciBiYWNrZ3JvdW5kXG4gICAqXG4gICAqIEBwYXJhbSBjb2xvciBjb2xvciB0byBiZSBpbnNlcnRlZFxuICAgKiBAcGFyYW0gd2hlcmUgd2hlcmUgdGhlIGNvbG9yIGhhcyB0byBiZSBpbnNlcnRlZCBlaXRoZXIgdGV4dC9iYWNrZ3JvdW5kXG4gICAqL1xuICBpbnNlcnRDb2xvcihjb2xvcjogc3RyaW5nLCB3aGVyZTogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgcmVzdG9yZWQgPSB0aGlzLnJlc3RvcmVTZWxlY3Rpb24oKTtcbiAgICBpZiAocmVzdG9yZWQpIHtcbiAgICAgIGlmICh3aGVyZSA9PT0gJ3RleHRDb2xvcicpIHtcbiAgICAgICAgdGhpcy5kb2MuZXhlY0NvbW1hbmQoJ2ZvcmVDb2xvcicsIGZhbHNlLCBjb2xvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRvYy5leGVjQ29tbWFuZCgnaGlsaXRlQ29sb3InLCBmYWxzZSwgY29sb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgZm9udCBuYW1lXG4gICAqIEBwYXJhbSBmb250TmFtZSBzdHJpbmdcbiAgICovXG4gIHNldEZvbnROYW1lKGZvbnROYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLmRvYy5leGVjQ29tbWFuZCgnZm9udE5hbWUnLCBmYWxzZSwgZm9udE5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBmb250IHNpemVcbiAgICogQHBhcmFtIGZvbnRTaXplIHN0cmluZ1xuICAgKi9cbiAgc2V0Rm9udFNpemUoZm9udFNpemU6IHN0cmluZykge1xuICAgIHRoaXMuZG9jLmV4ZWNDb21tYW5kKCdmb250U2l6ZScsIGZhbHNlLCBmb250U2l6ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIHJhdyBIVE1MXG4gICAqIEBwYXJhbSBodG1sIEhUTUwgc3RyaW5nXG4gICAqL1xuICBpbnNlcnRIdG1sKGh0bWw6IHN0cmluZyk6IHZvaWQge1xuXG4gICAgY29uc3QgaXNIVE1MSW5zZXJ0ZWQgPSB0aGlzLmRvYy5leGVjQ29tbWFuZCgnaW5zZXJ0SFRNTCcsIGZhbHNlLCBodG1sKTtcblxuICAgIGlmICghaXNIVE1MSW5zZXJ0ZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIHBlcmZvcm0gdGhlIG9wZXJhdGlvbicpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBzYXZlIHNlbGVjdGlvbiB3aGVuIHRoZSBlZGl0b3IgaXMgZm9jdXNzZWQgb3V0XG4gICAqL1xuICBwdWJsaWMgc2F2ZVNlbGVjdGlvbiA9ICgpOiB2b2lkID0+IHtcbiAgICBpZiAodGhpcy5kb2MuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICBjb25zdCBzZWwgPSB0aGlzLmRvYy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgIGlmIChzZWwuZ2V0UmFuZ2VBdCAmJiBzZWwucmFuZ2VDb3VudCkge1xuICAgICAgICB0aGlzLnNhdmVkU2VsZWN0aW9uID0gc2VsLmdldFJhbmdlQXQoMCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUZXh0ID0gc2VsLnRvU3RyaW5nKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmRvYy5nZXRTZWxlY3Rpb24gJiYgdGhpcy5kb2MuY3JlYXRlUmFuZ2UpIHtcbiAgICAgIHRoaXMuc2F2ZWRTZWxlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNhdmVkU2VsZWN0aW9uID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmVzdG9yZSBzZWxlY3Rpb24gd2hlbiB0aGUgZWRpdG9yIGlzIGZvY3VzZWQgaW5cbiAgICpcbiAgICogc2F2ZWQgc2VsZWN0aW9uIHdoZW4gdGhlIGVkaXRvciBpcyBmb2N1c2VkIG91dFxuICAgKi9cbiAgcmVzdG9yZVNlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5zYXZlZFNlbGVjdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9jLmdldFNlbGVjdGlvbikge1xuICAgICAgICBjb25zdCBzZWwgPSB0aGlzLmRvYy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICBzZWwuYWRkUmFuZ2UodGhpcy5zYXZlZFNlbGVjdGlvbik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmRvYy5nZXRTZWxlY3Rpb24gLyomJiB0aGlzLnNhdmVkU2VsZWN0aW9uLnNlbGVjdCovKSB7XG4gICAgICAgIC8vIHRoaXMuc2F2ZWRTZWxlY3Rpb24uc2VsZWN0KCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHNldFRpbWVvdXQgdXNlZCBmb3IgZXhlY3V0ZSAnc2F2ZVNlbGVjdGlvbicgbWV0aG9kIGluIG5leHQgZXZlbnQgbG9vcCBpdGVyYXRpb25cbiAgICovXG4gIHB1YmxpYyBleGVjdXRlSW5OZXh0UXVldWVJdGVyYXRpb24oY2FsbGJhY2tGbjogKC4uLmFyZ3M6IGFueSkgPT4gYW55LCB0aW1lb3V0ID0gMWUyKTogdm9pZCB7XG4gICAgc2V0VGltZW91dChjYWxsYmFja0ZuLCB0aW1lb3V0KTtcbiAgfVxuXG4gIC8qKiBjaGVjayBhbnkgc2VsZWN0aW9uIGlzIG1hZGUgb3Igbm90ICovXG4gIHByaXZhdGUgY2hlY2tTZWxlY3Rpb24oKTogYW55IHtcblxuICAgIGNvbnN0IHNlbGVjdGVkVGV4dCA9IHRoaXMuc2F2ZWRTZWxlY3Rpb24udG9TdHJpbmcoKTtcblxuICAgIGlmIChzZWxlY3RlZFRleHQubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIFNlbGVjdGlvbiBNYWRlJyk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwbG9hZCBmaWxlIHRvIHVwbG9hZFVybFxuICAgKiBAcGFyYW0gZmlsZSBUaGUgZmlsZVxuICAgKi9cbiAgdXBsb2FkSW1hZ2UoZmlsZTogRmlsZSk6IE9ic2VydmFibGU8SHR0cEV2ZW50PFVwbG9hZFJlc3BvbnNlPj4ge1xuXG4gICAgY29uc3QgdXBsb2FkRGF0YTogRm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuICAgIHVwbG9hZERhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSwgZmlsZS5uYW1lKTtcblxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdDxVcGxvYWRSZXNwb25zZT4odGhpcy51cGxvYWRVcmwsIHVwbG9hZERhdGEsIHtcbiAgICAgIHJlcG9ydFByb2dyZXNzOiB0cnVlLFxuICAgICAgb2JzZXJ2ZTogJ2V2ZW50cycsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0IGltYWdlIHdpdGggVXJsXG4gICAqIEBwYXJhbSBpbWFnZVVybCBUaGUgaW1hZ2VVcmwuXG4gICAqL1xuICBpbnNlcnRJbWFnZShpbWFnZVVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5kb2MuZXhlY0NvbW1hbmQoJ2luc2VydEltYWdlJywgZmFsc2UsIGltYWdlVXJsKTtcbiAgfVxuXG4gIHNldERlZmF1bHRQYXJhZ3JhcGhTZXBhcmF0b3Ioc2VwYXJhdG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLmRvYy5leGVjQ29tbWFuZCgnZGVmYXVsdFBhcmFncmFwaFNlcGFyYXRvcicsIGZhbHNlLCBzZXBhcmF0b3IpO1xuICB9XG5cbiAgY3JlYXRlQ3VzdG9tQ2xhc3MoY3VzdG9tQ2xhc3M6IEN1c3RvbUNsYXNzKSB7XG4gICAgbGV0IG5ld1RhZyA9IHRoaXMuc2VsZWN0ZWRUZXh0O1xuICAgIGlmIChjdXN0b21DbGFzcykge1xuICAgICAgY29uc3QgdGFnTmFtZSA9IGN1c3RvbUNsYXNzLnRhZyA/IGN1c3RvbUNsYXNzLnRhZyA6ICdzcGFuJztcbiAgICAgIG5ld1RhZyA9ICc8JyArIHRhZ05hbWUgKyAnIGNsYXNzPVwiJyArIGN1c3RvbUNsYXNzLmNsYXNzICsgJ1wiPicgKyB0aGlzLnNlbGVjdGVkVGV4dCArICc8LycgKyB0YWdOYW1lICsgJz4nO1xuICAgIH1cbiAgICB0aGlzLmluc2VydEh0bWwobmV3VGFnKTtcbiAgfVxuXG4gIGluc2VydFZpZGVvKHZpZGVvVXJsOiBzdHJpbmcpIHtcbiAgICBpZiAodmlkZW9VcmwubWF0Y2goJ3d3dy55b3V0dWJlLmNvbScpKSB7XG4gICAgICB0aGlzLmluc2VydFlvdVR1YmVWaWRlb1RhZyh2aWRlb1VybCk7XG4gICAgfVxuICAgIGlmICh2aWRlb1VybC5tYXRjaCgndmltZW8uY29tJykpIHtcbiAgICAgIHRoaXMuaW5zZXJ0VmltZW9WaWRlb1RhZyh2aWRlb1VybCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbnNlcnRZb3VUdWJlVmlkZW9UYWcodmlkZW9Vcmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGlkID0gdmlkZW9Vcmwuc3BsaXQoJ3Y9JylbMV07XG4gICAgY29uc3QgaW1hZ2VVcmwgPSBgaHR0cHM6Ly9pbWcueW91dHViZS5jb20vdmkvJHtpZH0vMC5qcGdgO1xuICAgIGNvbnN0IHRodW1ibmFpbCA9IGBcbiAgICAgIDxkaXYgc3R5bGU9J3Bvc2l0aW9uOiByZWxhdGl2ZSc+XG4gICAgICAgIDxpbWcgc3R5bGU9J3Bvc2l0aW9uOiBhYnNvbHV0ZTsgbGVmdDoyMDBweDsgdG9wOjE0MHB4J1xuICAgICAgICAgICAgIHNyYz1cImh0dHBzOi8vaW1nLmljb25zOC5jb20vY29sb3IvOTYvMDAwMDAwL3lvdXR1YmUtcGxheS5wbmdcIlxuICAgICAgICA8YSBocmVmPScke3ZpZGVvVXJsfScgdGFyZ2V0PSdfYmxhbmsnPlxuICAgICAgICAgIDxpbWcgc3JjPVwiJHtpbWFnZVVybH1cIiBhbHQ9XCJjbGljayB0byB3YXRjaFwiLz5cbiAgICAgICAgPC9hPlxuICAgICAgPC9kaXY+YDtcbiAgICB0aGlzLmluc2VydEh0bWwodGh1bWJuYWlsKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5zZXJ0VmltZW9WaWRlb1RhZyh2aWRlb1VybDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3Qgc3ViID0gdGhpcy5odHRwLmdldDxhbnk+KGBodHRwczovL3ZpbWVvLmNvbS9hcGkvb2VtYmVkLmpzb24/dXJsPSR7dmlkZW9Vcmx9YCkuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgY29uc3QgaW1hZ2VVcmwgPSBkYXRhLnRodW1ibmFpbF91cmxfd2l0aF9wbGF5X2J1dHRvbjtcbiAgICAgIGNvbnN0IHRodW1ibmFpbCA9IGA8ZGl2PlxuICAgICAgICA8YSBocmVmPScke3ZpZGVvVXJsfScgdGFyZ2V0PSdfYmxhbmsnPlxuICAgICAgICAgIDxpbWcgc3JjPVwiJHtpbWFnZVVybH1cIiBhbHQ9XCIke2RhdGEudGl0bGV9XCIvPlxuICAgICAgICA8L2E+XG4gICAgICA8L2Rpdj5gO1xuICAgICAgdGhpcy5pbnNlcnRIdG1sKHRodW1ibmFpbCk7XG4gICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5leHROb2RlKG5vZGUpIHtcbiAgICBpZiAobm9kZS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIHJldHVybiBub2RlLmZpcnN0Q2hpbGQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdoaWxlIChub2RlICYmICFub2RlLm5leHRTaWJsaW5nKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICB9XG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbm9kZS5uZXh0U2libGluZztcbiAgICB9XG4gIH1cblxuICBnZXRSYW5nZVNlbGVjdGVkTm9kZXMocmFuZ2UsIGluY2x1ZGVQYXJ0aWFsbHlTZWxlY3RlZENvbnRhaW5lcnMpIHtcbiAgICBsZXQgbm9kZSA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyO1xuICAgIGNvbnN0IGVuZE5vZGUgPSByYW5nZS5lbmRDb250YWluZXI7XG4gICAgbGV0IHJhbmdlTm9kZXMgPSBbXTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgYSByYW5nZSB0aGF0IGlzIGNvbnRhaW5lZCB3aXRoaW4gYSBzaW5nbGUgbm9kZVxuICAgIGlmIChub2RlID09PSBlbmROb2RlKSB7XG4gICAgICByYW5nZU5vZGVzID0gW25vZGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJdGVyYXRlIG5vZGVzIHVudGlsIHdlIGhpdCB0aGUgZW5kIGNvbnRhaW5lclxuICAgICAgd2hpbGUgKG5vZGUgJiYgbm9kZSAhPT0gZW5kTm9kZSkge1xuICAgICAgICByYW5nZU5vZGVzLnB1c2goIG5vZGUgPSB0aGlzLm5leHROb2RlKG5vZGUpICk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBwYXJ0aWFsbHkgc2VsZWN0ZWQgbm9kZXMgYXQgdGhlIHN0YXJ0IG9mIHRoZSByYW5nZVxuICAgICAgbm9kZSA9IHJhbmdlLnN0YXJ0Q29udGFpbmVyO1xuICAgICAgd2hpbGUgKG5vZGUgJiYgbm9kZSAhPT0gcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXIpIHtcbiAgICAgICAgcmFuZ2VOb2Rlcy51bnNoaWZ0KG5vZGUpO1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBhbmNlc3RvcnMgb2YgdGhlIHJhbmdlIGNvbnRhaW5lciwgaWYgcmVxdWlyZWRcbiAgICBpZiAoaW5jbHVkZVBhcnRpYWxseVNlbGVjdGVkQ29udGFpbmVycykge1xuICAgICAgbm9kZSA9IHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyO1xuICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgcmFuZ2VOb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByYW5nZU5vZGVzO1xuICB9XG5cbiAgZ2V0U2VsZWN0ZWROb2RlcygpIHtcbiAgICBjb25zdCBub2RlcyA9IFtdO1xuICAgIGlmICh0aGlzLmRvYy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgIGNvbnN0IHNlbCA9IHRoaXMuZG9jLmdldFNlbGVjdGlvbigpO1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNlbC5yYW5nZUNvdW50OyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgbm9kZXMucHVzaC5hcHBseShub2RlcywgdGhpcy5nZXRSYW5nZVNlbGVjdGVkTm9kZXMoc2VsLmdldFJhbmdlQXQoaSksIHRydWUpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGVzO1xuICB9XG5cbiAgcmVwbGFjZVdpdGhPd25DaGlsZHJlbihlbCkge1xuICAgIGNvbnN0IHBhcmVudCA9IGVsLnBhcmVudE5vZGU7XG4gICAgd2hpbGUgKGVsLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShlbC5maXJzdENoaWxkLCBlbCk7XG4gICAgfVxuICAgIHBhcmVudC5yZW1vdmVDaGlsZChlbCk7XG4gIH1cblxuICByZW1vdmVTZWxlY3RlZEVsZW1lbnRzKHRhZ05hbWVzKSB7XG4gICAgY29uc3QgdGFnTmFtZXNBcnJheSA9IHRhZ05hbWVzLnRvTG93ZXJDYXNlKCkuc3BsaXQoJywnKTtcbiAgICB0aGlzLmdldFNlbGVjdGVkTm9kZXMoKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMSAmJlxuICAgICAgICB0YWdOYW1lc0FycmF5LmluZGV4T2Yobm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkpID4gLTEpIHtcbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBub2RlIGFuZCByZXBsYWNlIGl0IHdpdGggaXRzIGNoaWxkcmVuXG4gICAgICAgIHRoaXMucmVwbGFjZVdpdGhPd25DaGlsZHJlbihub2RlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19