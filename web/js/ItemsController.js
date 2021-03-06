/*  Visual Shopping List for the Web
    Copyright (C) 2013-2015 Мобилен прогрес ЕООД, София, България

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

    Linking "Visual Shopping List for the Web" statically or dynamically with 
    other modules is making a combined work based on Visual Shopping List. 
    Thus, the terms and conditions of the GNU General Public License cover 
    the whole combination.

    As a special exception to the GPL, any HTML file which merely makes 
    function calls to this code, and for that purpose includes it by 
    reference shall be deemed a separate work for copyright law purposes. 

    In addition, as a special exception, the copyright holders of 
    "Visual Shopping List for the Web" give you permission to combine 
    "Visual Shopping List for the Web" with free software programs or 
    libraries that are released under the GNU LGPL and with code included in 
    the standard release of the "jquery" library under the "jquery" library's 
    license (or modified versions of such code, with unchanged license). You 
    may copy and distribute such a system following the terms of the GNU GPL 
    for "Visual Shopping List for the Web" and the licenses of the other code 
    concerned.

    Note that people who make modified versions of "Visual Shopping List for 
    the Web" are not obligated to grant these special exceptions for their 
    modified versions; it is their choice whether to do so. 
    The GNU General Public License gives permission to release a modified 
    version without the exceptions above;

    Linking "Visual Shopping List for the Web" statically or dynamically with 
    other modules is making a combined work based on Visual Shopping List. 
    Thus, the terms and conditions of the GNU General Public License cover 
    the whole combination.

    As a special exception to the GPL, any HTML file which merely makes 
    function calls to this code, and for that purpose includes it by 
    reference shall be deemed a separate work for copyright law purposes. 

    In addition, as a special exception, the copyright holders of 
    "Visual Shopping List for the Web" give you permission to combine 
    "Visual Shopping List for the Web" with free software programs or 
    libraries that are released under the GNU LGPL and with code included in 
    the standard release of the "jquery" library under the "jquery" library's 
    license (or modified versions of such code, with unchanged license). You 
    may copy and distribute such a system following the terms of the GNU GPL 
    for "Visual Shopping List for the Web" and the licenses of the other code 
    concerned.

    Note that people who make modified versions of "Visual Shopping List for 
    the Web" are not obligated to grant these special exceptions for their 
    modified versions; it is their choice whether to do so. 
    The GNU General Public License gives permission to release a modified 
    version without the exceptions above;
*/



var kESGetList = 0;
var kESVegetables = 1;
var kESBaseFood = 2;
var kESFruits = 3;
var kESSpices = 4;
var kESDrinks = 5;
var kESCategories = 6;

var listTable;

function ItemsController(itemsTypeArg) {

    this.vegetables = new Array();
    this.base_food = new Array();
    this.fruits = new Array();
    this.spices = new Array();
    this.drinks = new Array();
    this.categories = new Array();

    this.listArray = new Array();
    this.itemsType = itemsTypeArg;

    this.mp_view = 0;

    this.viewDidLoad = viewDidLoad;
    this.numberOfRows = numberOfRows;
    this.cellForRowCol = cellForRowCol;
    this.didSelectRow = didSelectRow;
    this.tableViewDidSelectRow = tableViewDidSelectRow;
    this.alertViewButtonAtIndex = alertViewButtonAtIndex;
    this.loadData = loadData;
    this.loadDataFromJsonDictInArray = loadDataFromJsonDictInArray;
    this.loadGetList = loadGetList;
    this.loadGetListForArray = loadGetListForArray;
    this.clearAllItems = clearAllItems;
    this.deleteItem = deleteItem;
    this.itemsSort = itemsSort;

    this.checkDoubleClickAtRow = checkDoubleClickAtRow;
    this.commitDeleteForRow = commitDeleteForRow;
    this.deleteItem = deleteItem;

    this.lastClickRow = 0;
    this.lastClickTime = 0;

    this.setCustomIcon = setCustomIcon;
    this.cellAccessory = cellAccessory;

    // function itemsSort(num1, num2, context);

    // function loadData();
    // function loadDataFromJsonDict(root, array, nameKey, iconKey);
    // function loadGetList();
    // function loadGetListForArray(array);
    // function clearAllItems();


// - (void)viewWillAppear:(BOOL)animated
// {
//     [[self navigationController] setNavigationBarHidden:NO animated:animated];
//     [[[self navigationController] navigationBar] setBarStyle:UIBarStyleBlack];
// }

    function viewDidLoad()
    {
        title = this.mp_view.children(".mp_title_bar").children(".mp_bar_title");
        listTable = this.mp_view.children(".mp_list");
        listTable.delegate = this;
        rightButton = this.mp_view.children(".mp_title_bar").children(".mp_bar_button");

        // Do any additional setup after loading the view.
    
        loctxt = localized("items_list_title");
        if(loctxt == "items_list_title")
        {
            loctxt = "Items List";
        }
        title.text(loctxt);
        
        rightButton.html("<a href=\"#\" onClick=\"listTable.delegate.clearAllItems();\">" + (localized("clear")) + "</a>");
        
        this.vegetables = new Array();
        this.base_food = new Array();
        this.fruits = new Array();
        this.spices = new Array();
        this.drinks = new Array();
        this.categories = new Array();
        
        listTable.empty();

        this.loadData();
    
        switch (this.itemsType) {
        case kESGetList:
            this.loadGetList();
            rightButton.html("<a href=\"#\" onClick=\"listTable.delegate.clearAllItems();\">" + (localized("check_all")) + "</a>");
            
            loctxt = localized("shopping_list");
            if(loctxt == "shopping_list")
            {
                loctxt = "Shopping List";
            }
            title.text(loctxt);
            break;
        case kESVegetables:
            this.listArray  = this.vegetables;
            loctxt = localized("vegetables_title");
            if(loctxt == "vegetables_title")
            {
                loctxt = "Vegetables";
            }
            title.text(loctxt);
            break;
        case kESBaseFood:
            this.listArray = this.base_food;
            loctxt = localized("base_food_title");
            if(loctxt == "base_food_title")
            {
                loctxt = "Base Food";
            }
            title.text(loctxt);
            break;
        case kESFruits:
            this.listArray = this.fruits;
            loctxt = localized("fruits_title");
            if(loctxt == "fruits_title")
            {
                loctxt = "Fruits";
            }
            title.text(loctxt);
            break;
        case kESSpices:
            this.listArray = this.spices;
            loctxt = localized("spices_title");
            if(loctxt == "spices_title")
            {
                loctxt = "Spices";
            }
            title.text(loctxt);
            break;
        case kESDrinks:
            this.listArray = this.drinks;
            loctxt = localized("drinks_title");
            if(loctxt == "drinks_title")
            {
                loctxt = "Drinks";
            }
            title.text(loctxt);
            break;
        case kESCategories:
            this.listArray = this.categories;
            loctxt = localized("categories_title");
            if(loctxt == "categories_title")
            {
                loctxt = "Categories";
            }
            title.text(loctxt);
            break;
        default:
            break;
        }
    
        reloadData(listTable);
    }

// - (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
// {
//     return (interfaceOrientation == UIInterfaceOrientationPortrait);
// }

//pragma mark UITableView data source

// - (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
// {
//     return 1;
// }

    function numberOfRows(listTable)
    {
        return (this.itemsType == kESGetList)?(this.listArray.length + 1):(this.listArray.length + 2);
    }

    function cellAddItem(row)
    {
        cell = "<li class=\"mp_list_item vls_base_product noprint\" onClick=\"listTable.delegate.didSelectRow("+ row +", event);\">";
        cell += localized("add_item");
        cell = cell + "</li>";
        return cell;
    }

    function cellAccessory(row)
    {
        cell = "<li class=\"mp_list_item vls_base_product vsl_accessory noprint\">";
        if(this.itemsType == kESGetList) {
            cell += "<a href=\"#\" onClick=\"save_url_data()\"><img src=\"images/sync@2x.png\" width=\"60px\" height=\"44px\" class=\"save_button\" /></a>";
        }
        cell += "<div  class=\"print_button\" onclick=\"window.print();return false;\"><img src=\"images/print_icn.png\" alt=\"Print this page\" /><br /></div>";
        cell = cell + "</li>";
        return cell;
    }

    function cellForRowCol(listTable, row, col)
    {
        //calc left or right column for big screen with two item columns
        //for now it is used for print page only
        var column = (row % 2)?"right_item":"left_item"; //non even on right
        if(this.listArray.length < 10)
        {
            column = "";
        }

        var cell = "<li class=\"mp_list_item vls_base_product " + column + "\" onClick=\"listTable.delegate.didSelectRow("+ row +", event);\">";
        if(row == this.listArray.length)
        {
            if(this.itemsType == kESGetList)
            {
                return this.cellAccessory(row);
            }else
            {
                return cellAddItem(row);
            }
        }

        //The accessory row with print button icon/text size buttons, etc
        //We dont check for kESGetList page as length+1 index is not possible
        //because on get list there is no addItem row
        if(row == this.listArray.length + 1)
        {
            return this.cellAccessory(row);
        }

        var img = this.listArray[row].itemIcon;
        if(readCookie(toHex(this.listArray[row].name) + "_flag")) {
            img = readCookie(toHex(this.listArray[row].name) + "_img");
            if(!img) {
                cell = cell + "<img class=\"custom_img\" src=\"images/Icon.png\" alt=\"\" onClick=\"listTable.delegate.setCustomIcon('" + this.listArray[row].name + "', event)\" />";
            }else {
                URL.revokeObjectURL(img);
                cell = cell + "<img class=\"custom_img\" src=\"" + img + "\" alt=\"\" onClick=\"listTable.delegate.setCustomIcon('" + this.listArray[row].name + "', event);\" />";
            }
        }else if(img.substr(0,4).toLowerCase() == "http") {
            cell = cell + "<img src=\"" + img + "\" alt=\"\" />";
        }else {
            cell = cell + "<img src=\"images/" + img + "\" alt=\"\" />";
        }

        var localName = this.listArray[row].name;
        if(localized(localName))
            localName = localized(localName);
        cell += localName;
        // cell.textLabel.textAlignment = UITextAlignmentLeft;
        // cell.textLabel.lineBreakMode = UILineBreakModeWordWrap;
        // cell.textLabel.adjustsFontSizeToFitWidth = YES;
        // cell.textLabel.minimumFontSize = 5.0f;
        // cell.textLabel.numberOfLines = 2;
        // [cell.imageView setContentMode:UIViewContentModeScaleAspectFit];
        // cell.imageView.frame = CGRectMake(0.0f, 0.0f, 55.0f, 55.0f);

        var checked = readCookie(toHex((this.listArray[row]).itemIcon));
        
        if(this.itemsType == kESGetList)
            checked = !checked;
        
        if(checked)
        {
            cell += "<div class=\"vsl_check\"><img src=\"images/check.png\" alt=\"check_box\" /></div>";
        }
        else
        {
            cell += "<div class=\"vsl_check\"><img src=\"images/check_empty.png\" alt=\"check_box\" /></div>";
        }
        
        cell = cell + "</li>";
        return cell;
    }

    function didSelectRow(row, event) {
        if(!event)
            event = window.event;

        if(event.stopPropagation) {
            event.stopPropagation();
        } else{ //IE 8
            e.cancelBubble = true;
        }

        this.tableViewDidSelectRow(listTable, row);
    }

    function tableViewDidSelectRow(tableView, row)
    {
        if(this.checkDoubleClickAtRow(row))
        {
            return;
        }
        if(row == this.listArray.length)
        {   
            // MProAlertView *view = [[MProAlertView alloc] initWithTitle:localized(@"add_item") message:[NSString stringWithFormat:@"%@ \n\n\n", localized(@"enter_item_name")] delegate:self cancelButtonTitle:localized(@"cancel") otherButtonTitles:localized(@"enter"), nil];
            
            // [view show];
            var item_name = prompt(localized("enter_item_name"));
            if(item_name)
            {
                this.alertViewButtonAtIndex(item_name, 1)
            }
            
            return;
        }

        var checked = readCookie(toHex(this.listArray[row].itemIcon));
        createCookie(toHex(this.listArray[row].itemIcon),((!checked)?"true":""),0);
        
        if(this.itemsType == kESGetList)
            checked = !checked;

        var lists = document.getElementsByTagName("ul");
        if(lists.length > 0) {
            var theList = lists[lists.length - 1].getElementsByTagName("li");
            if(row < theList.length) {
                var tagString = "<img src=\"images/check.png\" alt=\"check_box\">";
                if(checked) {
                    tagString = "<img src=\"images/check_empty.png\" alt=\"check_box\">";
                }
                theList[row].getElementsByTagName("div")[0].getElementsByTagName("img")[0].outerHTML = tagString;
            }
        }
        
        /*cell = listTable.children().eq(row);
        cellHtml = cell.html();
        
        var checked = readCookie(toHex(this.listArray[row].itemIcon));
        createCookie(toHex(this.listArray[row].itemIcon),((!checked)?"true":""),0);

        if(this.itemsType == kESGetList)
        {
            cellHtml = cellHtml.replace("check.png", "check_empty.png");
            cell.replaceWith(cellHtml);
        }
        else
        {
            cellHtml = cellHtml.replace("check_empty.png", "check.png");
            cell.replaceWith(cellHtml);
        }*/
        
        //reloadData(listTable);
        
    }

    function alertViewButtonAtIndex(alertViewText, buttonIndex)
    {
        
        if(buttonIndex == 0)
        {
            return;
        }
        
        var error;
        var itemName = alertViewText;
        var categoryKey = "categories";
        var categoryIconKey = "categories_icons";
        switch (this.itemsType) {
        case kESVegetables:
            categoryKey = "vegetables";
            categoryIconKey = "vegetables_icons";
            break;
        case kESBaseFood:
            categoryKey = "base_food";
            categoryIconKey = "base_food_icons";
            break;
        case kESFruits:
            categoryKey = "fruits";
            categoryIconKey = "fruits_icons";
            break;
        case kESSpices:
            categoryKey = "spices";
            categoryIconKey = "spices_icons";
            break;
        case kESDrinks:
            categoryKey = "drinks";
            categoryIconKey = "drinks_icons";
            break;
        case kESCategories:
            categoryKey = "categories";
            categoryIconKey = "categories_icons";
            break;
            
        default:
            break;
        }
        
        var array = JSON.parse(readCookie(categoryKey));
        array[array.length] = (itemName);
        createCookie(categoryKey, JSON.stringify(array),0);
        array = JSON.parse(readCookie(categoryIconKey));
        array[array.length] = (itemName + ".png");
        createCookie(categoryIconKey, JSON.stringify(array),0);

        
        createCookie(toHex(itemName)+"_flag", "true",0);
        
        this.loadData();
        reloadData(listTable);

    }

    function checkDoubleClickAtRow(row)
    {
        if(this.lastClickRow == row && Math.abs(this.lastClickTime - Date.now()) < 500) 
        {

            this.commitDeleteForRow(row);
            return true;
        }
        this.lastClickRow = row;
        this.lastClickTime = Date.now();
        return false;
    }

    function commitDeleteForRow(row)
    {
        var item = this.listArray[row];

        this.deleteItem(item);
    }

//pragma mark private

    function loadData()
    {
        var error;
        var jsonString = 0;//[NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:&error];
        
        var root = 0;//(NSDictionary *)[jsonString objectFromJSONString];
        
        this.vegetables.length = 0;
        this.loadDataFromJsonDictInArray(root, this.vegetables, "vegetables", "vegetables_icons");
        this.base_food.length = 0;
        this.loadDataFromJsonDictInArray(root, this.base_food, "base_food", "base_food_icons");
        this.fruits.length = 0;
        this.loadDataFromJsonDictInArray(root, this.fruits, "fruits", "fruits_icons");
        this.spices.length = 0;
        this.loadDataFromJsonDictInArray(root, this.spices, "spices", "spices_icons");
        this.drinks.length = 0;
        this.loadDataFromJsonDictInArray(root, this.drinks, "drinks", "drinks_icons");
        this.categories.length = 0;
        this.loadDataFromJsonDictInArray(root, this.categories, "categories", "categories_icons");
        
    }

    function loadDataFromJsonDictInArray(root, array, nameKey, iconKey)
    {
        var objectsArray = JSON.parse(readCookie(nameKey));
        if(objectsArray == null)
            return;
        var objectsIconsArray = JSON.parse(readCookie(iconKey));
        if(objectsIconsArray == null)
            return;

        for(var i = 0; i < objectsArray.length; ++i)
        {
            var item = new Object();
            item.name = objectsArray[i];
            item.itemIcon = objectsIconsArray[i];
            array[array.length] = item;
        }

        array.sort(this.itemsSort);
    }


    function loadGetList()
    {    
        this.listArray = new Array();
        this.loadGetListForArray(this.vegetables);
        this.loadGetListForArray(this.base_food);
        this.loadGetListForArray(this.fruits);
        this.loadGetListForArray(this.spices);
        this.loadGetListForArray(this.drinks);
        this.loadGetListForArray(this.categories);
    }

    function loadGetListForArray(array)
    {
        for(var i = 0; i < array.length; ++i)
        {
            if(readCookie(toHex(array[i].itemIcon)) && JSON.parse(readCookie(toHex(array[i].itemIcon)))) {
                this.listArray[this.listArray.length] = array[i];
            }
        }
    }

    function clearAllItems()
    {
        for(i = 0; i < this.listArray.length; ++i)
        {
            var item = this.listArray[i];
            createCookie(toHex(item.itemIcon), "", 0);
        }
        if(listTable)
        {
            reloadData(listTable);
        }
    }

    function setCustomIcon(itemName, event) {

        if(!event)
            event = window.event;

        if(event.stopPropagation) {
            event.stopPropagation();
        } else{ //IE 8
            e.cancelBubble = true;
        }

        var mpprompt = new MPPrompt();
        var oldUrl = readCookie(toHex(itemName) + "_img");
        if(!oldUrl) oldUrl = ""; //if null value set it to empty string

        mpprompt.initWithContent("<p>Paste custom item image URL:<br /><input type=\"text\" value=\"" + oldUrl + "\"></p>");
        function PromptDelegate() {
            this.buttonTouched = function buttonTouched(number) {
                if(number == 0) {
                    var txtInput = document.querySelector('input[type=text]');
                    var iconURL = txtInput.value;
                    createCookie(toHex(itemName) + "_img", iconURL, 0);        
                    reloadData(listTable);
                }
            }
        }
        mpprompt.delegate = new PromptDelegate();
        mpprompt.show();

    }

    function deleteItem(item)
    {
        var categoryKey = "categories";
        var categoryIconKey = "categories_icons";
        switch (this.itemsType) {
        case kESVegetables:
            categoryKey = "vegetables";
            categoryIconKey = "vegetables_icons";
            break;
        case kESBaseFood:
            categoryKey = "base_food";
            categoryIconKey = "base_food_icons";
            break;
        case kESFruits:
            categoryKey = "fruits";
            categoryIconKey = "fruits_icons";
            break;
        case kESSpices:
            categoryKey = "spices";
            categoryIconKey = "spices_icons";
            break;
        case kESDrinks:
            categoryKey = "drinks";
            categoryIconKey = "drinks_icons";
            break;
        case kESCategories:
            categoryKey = "categories";
            categoryIconKey = "categories_icons";
            break;
            
        default:
            break;
        }
        
        var array =  JSON.parse(readCookie(categoryIconKey));

        for(i = 0; i < array.length; ++i)
        {
            if(array[i] == item.itemIcon)
            {
                if(readCookie(toHex(item.name) + "_flag"))
                {


                    var result = confirm(localized("delete_question"));
                    if(!result) {
                        return;
                    }

                    array.splice(i, 1);
                    createCookie(categoryIconKey, JSON.stringify(array),0);
                    array =  JSON.parse(readCookie(categoryKey));
                    array.splice(i, 1);
                    createCookie(categoryKey, JSON.stringify(array),0);

                    eraseCookie(toHex(item.name) + "_flag");
                    eraseCookie(toHex(item.name) + "_img");
                    
                    this.loadData();
                    reloadData(listTable);
                }
            }
        }

    }

//pragma mark sorting

    function itemsSort(num1, num2)
    {
        var v1 = num1;
        var v2 = num2;
        
        if(v1.name.length > 5 && v1.name.substring(0,5) == "other")
        {
            return -1;
        }else if(v2.name.length > 5 && v2.name.substring(0,5) == "other")
        {
            return 1;
        }
        
        return localized(v1.name) > localized(v2.name)?1:0;
    }

}