
// Copyright (C) 2014 Kimmo Lahtinen (www.gimblll.com, http://www.twitter.com/gimblll)

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

////////////////
// Script configuration

// TODO: button: add all layers with "export" in name
// TODO: pattern for generating default export filename -> default filename after add -> replace spaces with underscores so 'select target' works straight away
// TODO: 'clear solo' button to clear solo tags from all exports
// TODO: allow running the export batch process without spawning the whole interface
// TODO: allow configuring the export format options explicitly
// TODO: cannot find any working way to make the log box auto scrolling... argh!

// $.level = 1 // Break on error - (Unfortunately Photoshop bugs when parsing actions list making this annoying to use)

const DEV_LOG_ENABLED = false;
const PREFERRED_PANEL_WIDTH = 1000;
const OPTIONS_FILENAME = "GBLSpriteExporterAppSettings.json";
const APPLICATION_NAME = "GBL Texture Exporter"
const APPLICATION_VERSION = "1.02"
const XMP_METADATA_PROPERTY_NAME = "TextureExporterDocumentPreferencesJSONv1"
const XMP_METADATA_NAMESPACE = "http://ns.gimblll.com/ps_texture_exporter";
const XMP_METADATA_NS_PREFIX = "nsgbl:";

////////////////
// Minified JSON2.js inlined here to avoid external dependencies (https://github.com/douglascrockford/JSON-js, public domain)
var JSON;JSON||(JSON={});(function(){function k(a){return a<10?"0"+a:a}function o(a){p.lastIndex=0;return p.test(a)?'"'+a.replace(p,function(a){var c=r[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function l(a,j){var c,d,h,m,g=e,f,b=j[a];b&&typeof b==="object"&&typeof b.toJSON==="function"&&(b=b.toJSON(a));typeof i==="function"&&(b=i.call(j,a,b));switch(typeof b){case "string":return o(b);case "number":return isFinite(b)?String(b):"null";case "boolean":case "null":return String(b);case "object":if(!b)return"null";e+=n;f=[];if(Object.prototype.toString.apply(b)==="[object Array]"){m=b.length;for(c=0;c<m;c+=1)f[c]=l(c,b)||"null";h=f.length===0?"[]":e?"[\n"+e+f.join(",\n"+e)+"\n"+g+"]":"["+f.join(",")+"]";e=g;return h}if(i&&typeof i==="object"){m=i.length;for(c=0;c<m;c+=1)typeof i[c]==="string"&&(d=i[c],(h=l(d,b))&&f.push(o(d)+(e?": ":":")+h))}else for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(h=l(d,b))&&f.push(o(d)+(e?": ":":")+h);h=f.length===0?"{}":e?"{\n"+e+f.join(",\n"+e)+"\n"+g+"}":"{"+f.join(",")+"}";e=g;return h}}if(typeof Date.prototype.toJSON!=="function")Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+k(this.getUTCMonth()+1)+"-"+k(this.getUTCDate())+"T"+k(this.getUTCHours())+":"+k(this.getUTCMinutes())+":"+k(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()};var q=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,p=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,e,n,r={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},i;if(typeof JSON.stringify!=="function")JSON.stringify=function(a,j,c){var d;n=e="";if(typeof c==="number")for(d=0;d<c;d+=1)n+=" ";else typeof c==="string"&&(n=c);if((i=j)&&typeof j!=="function"&&(typeof j!=="object"||typeof j.length!=="number"))throw Error("JSON.stringify");return l("",{"":a})};if(typeof JSON.parse!=="function")JSON.parse=function(a,e){function c(a,d){var g,f,b=a[d];if(b&&typeof b==="object")for(g in b)Object.prototype.hasOwnProperty.call(b,g)&&(f=c(b,g),f!==void 0?b[g]=f:delete b[g]);return e.call(a,d,b)}var d,a=String(a);q.lastIndex=0;q.test(a)&&(a=a.replace(q,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return d=eval("("+a+")"),typeof e==="function"?c({"":d},""):d;throw new SyntaxError("JSON.parse");}})();

////////////////
// Small development utility functions

var g__log_listener = null;
function log(obj) { if (g__log_listener) g__log_listener(obj); if (DEV_LOG_ENABLED) { $.writeln(obj); } }
function set_log_listener(listener) { g__log_listener = listener; }

function trim(str) { return str.replace(/^\s+|\s+$/g,''); } 
function assert(condition, fail_str) { if (!condition) { alert("Export script assertion fail. " + fail_str); throw Error("Assert Fail."); } }

////////////////
// Setup the XMP metadata library

function load_xmp_library()
{
	try
	{
		if (ExternalObject.AdobeXMPScript == undefined) 
		{
			// Load the library
			ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript"); 
		}
	}
	catch (err) 
	{ 
		alert("Failed to load XMP metadata library, failing. " + err); 
		return false;
	}

	try 
	{ 
		// Register custom namespace
		var old_prefix = XMPMeta.getNamespacePrefix(XMP_METADATA_NAMESPACE);

		if (old_prefix != XMP_METADATA_NS_PREFIX)
		{
			var actual_prefix = XMPMeta.registerNamespace(XMP_METADATA_NAMESPACE, XMP_METADATA_NS_PREFIX);
			assert(actual_prefix == XMP_METADATA_NS_PREFIX, "Namespace '" + XMP_METADATA_NS_PREFIX + "' registration failed, returned: " + actual_prefix);
		}
	}
	catch (err) 
	{ 
		alert("Failed to register exporter XMP namespace, failing. " + err); 
		return false;
	}

	return true;
}

////////////////
// Action handling utilities

function get_action_sets()
{
	// Parse action sets from Photoshop through the weirdo API
	const gClassActionSet 		= charIDToTypeID('ASet');
	const gClassAction 			= charIDToTypeID('Actn');
	const gKeyName 				= charIDToTypeID('Nm  ');
	const gKeyNumberOfChildren 	= charIDToTypeID('NmbC');

	var i = 1;
	var sets = [];

	while (true) 
	{   
		var ref = new ActionReference();   
		ref.putIndex(gClassActionSet, i);   

		var desc;   
		try { desc = executeActionGet(ref); } 
		catch (e) { break; } 

		if (desc.hasKey(gKeyName))
		{
			var set = {
				name 	: desc.getString(gKeyName),
				actions : [],
			};

			var action_count = desc.getInteger(gKeyNumberOfChildren);

			for (var j = 1; j <= action_count; ++j)
			{
				var ref = new ActionReference();
				ref.putIndex(gClassAction, j);
				ref.putIndex(gClassActionSet, i);

				var desc = executeActionGet(ref);
				set.actions.push(desc.getString(gKeyName));
			}

			sets.push(set);   
		}  

		++i;   
	}   

 	return sets;   
}

//////

function try_parse_json(str)
{
	try
	{
		return JSON.parse(str);
	}
	catch (err)
	{
		// JSON parsing failed, stuff is corrupt for some reason. Ignore.
	}

	return null;
}

function get_all_exportable_layers_raw_old(doc)
{
	var result = [];

	var layer_sets = doc.layerSets;
	for (var i = 0; i < layer_sets.length; ++i)
		result.push(layer_sets[i]);

	var art_layers = doc.artLayers;
	for (var i = 0; i < art_layers.length; ++i)
		result.push(art_layers[i]);

	return result;
}

function get_all_exportable_layers_raw(doc, result)
{
	var layers = doc.layers;
	var layer_count = layers.length; // Ask only once, it's really slow

	for (var i = 0; i < layer_count; ++i)
	{	
		var layer = layers[i];
		if (layer.typename == "LayerSet" || layer.typename == "ArtLayer")
		{
			result.push(layer);
			//get_all_exportable_layers_raw(layer, result); // Recursive (TOO SLOW STILL WITH MANY LAYRES... CANNOT USE)
		}
	}
}

function new_layer_cache(doc)
{
	// Read all exportable layers and cache them separately. Have to cache them
	// because for some reason basic layer iteration is really slow in Photoshop.
	var layers_cached = [];
	get_all_exportable_layers_raw(doc, layers_cached);
//	var layers_cached = get_all_exportable_layers_raw_old(doc);

	return {
		layers 			: layers_cached,
		set_visible_all : function(visible)
		{
			for (var i = 0; i < layers_cached.length; ++i)
				layers_cached[i].visible = visible;
		},
		get_ps_layer 	: function(layer_name)
		{
			for (var i = 0; i < layers_cached.length; ++i)
			{
				if (layer_name == layers_cached[i].name)
					return layers_cached[i];
			}

			return null;
		}
	};
}

function create_empty_panel(win, text)
{
	var panel = win.add("panel", undefined, text);
	panel.alignment = ["fill", "fill"];
	panel.alignChildren = ["fill", undefined]
	panel.preferredSize = [PREFERRED_PANEL_WIDTH, undefined];
	panel.margins = 12;
	return panel;
}

///////////////////////////////////////////////////////////////////////////////
// Storing and reading global app settings as JSON data file

function get_properties_filename()
{
	return Folder.userData + "/" + OPTIONS_FILENAME;
}

function get_properties_file()
{
	var file = new File(get_properties_filename());
	//log("Exists? " + file.exists + ": " + file.fsName);
	return file;
}

function read_global_properties()
{
	var prop_file = get_properties_file();

	if (prop_file.exists && prop_file.open("r"))
	{
		var settings_json = prop_file.read();
		prop_file.close();

		return try_parse_json(settings_json);
	}

	return null;
}

function read_global_property(property_id, default_value)
{
	var settings = read_global_properties();
	if (settings)
		return settings[property_id];
	else
		return default_value;
}

function store_global_property(property_id, value)
{
	var settings = read_global_properties();

	if (!settings)
		settings = {};

	settings[property_id] = value;

	var props_str = JSON.stringify(settings, null, "");
	var prop_file = get_properties_file();
	prop_file.open("w");

	var success = prop_file.write(props_str);
	//log("Writing settings: success: " + success);
	//log("Path: " + prop_file.fsName);
	//log("Content: " + props_str);

	prop_file.close();
}

///////////////////////////////////////////////////////////////////////////////
// Document metadata utilities (XMP)

function get_xmp(doc)
{
	try
	{  
		return new XMPMeta(doc.xmpMetadata.rawData);
	}
	catch(err)
	{
	    return new XMPMeta();
	}
}

function read_export_settings(doc)
{
	var doc_xmp = get_xmp(doc);
	assert(doc_xmp);

	var json_str = doc_xmp.getProperty(XMP_METADATA_NAMESPACE, XMP_METADATA_PROPERTY_NAME);
	var json_obj = try_parse_json(json_str)

	if (!json_obj)
	{
		// JSON loading failed, create default
		json_obj = {};
	}

	// Empty export list as default
	if (!json_obj.export_batch_items)
		json_obj.export_batch_items = [];

	// Store exporter version if we need to manager save upgrades in the future
	if (!json_obj.version)
		json_obj.version = APPLICATION_VERSION;

	assert(json_obj.export_batch_items,);
	return json_obj;
}

var g__cached_export_settings = null;

function get_export_settings(doc)
{
	// First get: read from the actual file
	if (!g__cached_export_settings)
		g__cached_export_settings = read_export_settings(doc);

	return g__cached_export_settings;
}

function store_export_settings(doc, json_obj)
{
	// Update cache
	g__cached_export_settings = json_obj;

	// Actually store into document
	var doc_xmp = get_xmp(doc);
	assert(doc_xmp);

	var json_str = JSON.stringify(json_obj, null, "");
	doc_xmp.setProperty(XMP_METADATA_NAMESPACE, XMP_METADATA_PROPERTY_NAME, json_str);

	doc.xmpMetadata.rawData = doc_xmp.serialize();
}

///////////////////////////////////////////////////////////////////////////////
// Project setup (root folder...)

function get_project_folders()
{
	return read_global_property("project_folders", []);
}

function store_folders(new_folders)
{
	store_global_property("project_folders", new_folders);
}

function get_stored_selection()
{
	return read_global_property("default_project", 0);
}

function store_default_selection(default_index)
{
	store_global_property("default_project", default_index);
}

function create_project_panel(win)
{
	var result = {
		onProjectChanged : function() {},
		getSelectedProjectFolder : function() 
		{
			var folders = get_project_folders();
			if (folders.length > 0)
				return folders[project_list.selection.index];
			else
				return null;
		}
	};

	var panel = create_empty_panel(win, "Global Settings (export root folder)");
	panel.helpTip = "Global settings are stored at: '" + get_properties_filename() + "'";

	// Dropdown for the project selection
	var project_list = panel.add("dropdownlist");
	project_list.helpTip = "Select the root folder where all exports paths should be relative to."

	// Add all predefined project folders to the dropdown list
	function refresh_folders()
	{
		// Remove old folders
		project_list.removeAll();

		// Add the new
		var folders = get_project_folders();
		for (var i = 0; i < folders.length; ++i)
		{
			project_list.add("item", folders[i]);
		}

		project_list.selection = get_stored_selection();
		project_list.enabled = (folders.length > 0);
	}

	project_list.onChange = function()
	{
		// Store the new default
		store_default_selection(project_list.selection.index);

		// Notify external listeners of project change
		result.onProjectChanged();
	}

	refresh_folders();

	// Configure buttons
	var btn_group = panel.add("group");
	var btn_add = btn_group.add("button", undefined, "Add Folder...");
	var btn_remove = btn_group.add("button", undefined, "Delete");

	// Add button functionality

	function refresh_ui()
	{
		refresh_folders();
   		refresh_remove_button();
		result.onProjectChanged();
	}

	btn_add.onClick = function() 
	{
		var input_folder = Folder.selectDialog("Select new project root folder");

		if (input_folder)
		{
			// Add selection
			var folders = get_project_folders();
			//folders.push(input_folder.fsName);
			folders.push(input_folder.absoluteURI);
    		store_folders(folders);

    		// Refresh UI
			store_default_selection(folders.length - 1);
			refresh_ui();
		}
	}

	// Delete button functionality

	function refresh_remove_button()
	{
		var folders = get_project_folders();
		btn_remove.enabled = (folders.length > 0);
	}

	refresh_remove_button();

	btn_remove.onClick = function()
	{
		var folders = get_project_folders();
		if (project_list.selection.index < folders.length)
		{
			// Remove the selection
    		folders.splice(project_list.selection.index, 1);
    		store_folders(folders);

    		// Refresh UI
			store_default_selection(0);
			refresh_ui();
    	}
	}

	return result;
}

///////////////////////////////////////////////////////////////////////////////
// Export layer list panel

function make_default_settings()
{
    return { 
    	source_layer_name : "",
    	export_path : "",
    	resize : 100,
    	solo : false,
    	post_action : null,
    	trim : false,
    };
}

function get_resized_size(doc, settings)
{
	if (settings.resize instanceof Array)
	{
		// Explicit size
		assert(settings.resize.length == 2);
		return settings.resize;
	}
	else
	{
		// Percentage
		var resize_scale = settings.resize / 100.0;
		var resized_x = doc.width.as("px") * resize_scale;
		var resized_y = doc.height.as("px") * resize_scale;

		return [ resized_x, resized_y ];
	}
}

function is_export_enabled(export_settings, export_item_idx)
{
	// Check if solo is enabled for any
	var soloing = false;

	for (var i = 0; i < export_settings.export_batch_items.length; ++i)
	{
		if (export_settings.export_batch_items[i].solo)
			soloing = true;
	}

	var e_item = export_settings.export_batch_items[export_item_idx];
	if (soloing)
		return e_item.solo;
	else
		return true;
}

function create_export_list_panel(win, doc)
{
	var result = {
		onChange : function() 
		{
		},
		getSelectedExport : function()
		{
			// Nothing selected check
			if (!export_list.selection)
				return null;

			var export_settings = get_export_settings(doc);
			assert(export_settings);
			assert(export_settings.export_batch_items);

			// Return the selected export item
			var selection_idx = export_list.selection.valueOf();
			return export_settings.export_batch_items[selection_idx];
		},
		setEnabled : function(enabled) 
		{
			panel.enabled = enabled;
			if (!enabled)
				export_list.selection = null;
			refresh_buttons();
		},
		setNewSelectionSettings : function(new_export_data)
		{
			if (!export_list.selection)
				return;

			// Read old settings
			var export_settings = get_export_settings(doc);
			var selection_idx = export_list.selection.valueOf();

			if (new_export_data)
			{
				// New settings given, override old
				export_settings.export_batch_items[selection_idx] = new_export_data;
			}
			else
			{
				// Null give, remove the selected
	   			export_settings.export_batch_items.splice(selection_idx, 1);
	   		}

	   		// Store new
			store_export_settings(doc, export_settings);

			// Refresh view
			if (new_export_data)
			{
				// Only item contents changed, update only texts to avoid onChanged messages
				refresh_list_items()
			}
			else
			{
				// List changed, update everything
				refresh_list();
			}
		}
	};

	// Cache document layers for fast access
	var layer_cache = new_layer_cache(doc);

	// Create the panel
	var panel = create_empty_panel(win, "Export Batch Items");

	// List of export batch items
	var export_list = panel.add("listbox", undefined, undefined, {
		numberOfColumns: 6, 
		showHeaders: true,
		columnTitles: ["Id", "Target Layer Name", "Status", "Export Path", "Action", "Resize", ],
		columnWidths: [40, 250, 100, 300, 200, 60, ],
		});

	export_list.preferredSize = [undefined, 200];

	function refresh_list_items()
	{
		// Refresh all items
		var export_settings = get_export_settings(doc);

		for (var i = 0; i < export_settings.export_batch_items.length; ++i)
		{

			var export_data = export_settings.export_batch_items[i];

			// Add item for the layer into the list
			var export_list_item = export_list.items[i];
//			export_list_item.text = i; 
			export_list_item.text = "";

			// TEMP KLUDGE UNTIL NEW TABLE API MANIFESTS ITSELF TO PHOTOSHOP
			// ... WHICH SEESM TO BE NEVER
			export_list_item.text += export_data.source_layer_name + " / "; 

			// Layer name
//			export_list_item.subItems[0].text = export_data.source_layer_name;
		
			// Status
			var layer_exists = !!layer_cache.get_ps_layer(export_data.source_layer_name);
			if (layer_exists)
			{
	//			export_list_item.subItems[1].text = "OK";
				export_list_item.text += "OK" + " / "; 
			}
			else
			{
//				export_list_item.subItems[1].text = "Layer not found";
				export_list_item.text += "Layer not found" + " / "; 
			}

			// Target path
//			export_list_item.subItems[2].text = export_data.export_path;
			export_list_item.text += export_data.export_path + " / "; 

			// Action
			if (export_data.post_action)
			{
//				export_list_item.subItems[3].text = export_data.post_action[1];
				export_list_item.text += export_data.post_action[1] + " / "; 
			}
			else
			{
//				export_list_item.subItems[3].text = "";
				export_list_item.text += " / "; 
			}

			// Resize
//			export_list_item.subItems[4].text = export_data.resize;
			export_list_item.text += export_data.resize + " / "; 

			// Trim
			export_list_item.text += export_data.trim + " / "; 


			if (is_export_enabled(export_settings, i))
				export_list_item.text += "[]";
			else
				export_list_item.text += "[ NO EXPORT ]";

//			export_list_item.checked = is_export_enabled(export_settings, i);
		}
	}

	function refresh_list()
	{
		// Store previous selection
		var old_selection = export_list.selection;
		if (old_selection != null)
			old_selection = old_selection.index;

		// Remove all old list
		export_list.removeAll();

		// Generate the new list
		var export_settings = get_export_settings(doc);

		for (var i = 0; i < export_settings.export_batch_items.length; ++i)
		{
			// Add item for the layer into the list
			export_list.add("item");
		}
			
		// Restore selection
		export_list.selection = old_selection;

		// Setup the correct texts
		refresh_list_items();
	};

	refresh_list();

	var note_text = panel.add("statictext", undefined, undefined, { multiline : true });
	note_text.text = "" + 
		"Layers are associated to export batch items by layer name, so if you change the name " +
		"of a layer, the association will be broken and highlighted here. Also duplicate layer " + 
		"names will not work with the script, only the first will be used.";
	// Force explicit size, as autolayout for some reason makes to box huge without this
	note_text.preferredSize = [ undefined, 30 ]; 

	// Add export batch item
	var btn_group1 = panel.add("group");
	var add_btn = btn_group1.add("button", undefined, "Add Export Batch Item");
	add_btn.minimumSize = [ 200, undefined ];
	add_btn.helpTip = "Add an item to the export batch list for the selected layer"

	add_btn.onClick = function()
	{
		assert(layer_list.selection);
		var selected_layer = layer_list.selection.toString();

		// Create a new item with good defaults
		var new_export_item = make_default_settings();
		new_export_item.source_layer_name = selected_layer;
		new_export_item.export_path = selected_layer + ".png";

		// Read old settings and add the new
		var export_settings = get_export_settings(doc);
		export_settings.export_batch_items.push(new_export_item);

		// Store the new settings
		store_export_settings(doc, export_settings);

		refresh_list();
	}

	// List of actual layers
	var layer_list = btn_group1.add("dropdownlist");
	layer_list.alignment = [ "fill", "fill" ];

	var exportable_layers = layer_cache.layers;
	for (var i = 0; i < exportable_layers.length; ++i)
		layer_list.add("item", exportable_layers[i].name);

	layer_list.selection = 0;

	// Remove item
	var btn_group2 = panel.add("group");
	var remove_btn = btn_group2.add("button", undefined, "Remove Selected");
	remove_btn.minimumSize = [ 200, null ];
	remove_btn.helpTip = "Remove the selected export batch item from the list"

	remove_btn.onClick = function()
	{
		assert(result.getSelectedExport(), "Nothing selected, but still pressed remove.")
		result.setNewSelectionSettings(null);

		result.onChange();
		refresh_buttons();
	}

	// Refresh stuff status on selection changes etc.
	function refresh_buttons()
	{
		var export_selection = result.getSelectedExport();
		remove_btn.enabled = !!export_selection;
		layer_list.enabled = (layer_list.items.length > 0);
		add_btn.enabled = layer_list.enabled;
	}

	export_list.onChange = function()
	{
		result.onChange();
		refresh_buttons();
	}

	return result;
}

///////////////////////////////////////////////////////////////////////////////
// Per export settings panel

function create_export_info_panel(win, doc, panel_project, panel_export_list)
{
	// Create the panel for layers
	var panel = create_empty_panel(win, "Export Item Setup");

	// Layer name control
	var name_text = panel.add("statictext");
	name_text.text = "Export Layer"

	var name_box = panel.add("edittext");
	name_box.onChange = refresh_model;

	// Export path controls
	var path_text = panel.add("statictext");
	path_text.text = "Export Path (relative to global root setting) (filename extension defines the export file format (.png, .tga))"

	var path_group = panel.add("group");

	var path_box = path_group.add("edittext");
	path_box.helpTip = "Target export path relative to the project path. Use forward slash '/' as directory separator."
	path_box.text = "";
	path_box.alignment = ["fill", "fill"];
	path_box.preferredSize = [ 450, undefined ];
	path_box.onChange = refresh_model;

	var path_btn = path_group.add("button");
	path_btn.text = "Select Target...";

	path_btn.onClick = function()
	{
		var project_folder = panel_project.getSelectedProjectFolder();
		var export_data = panel_export_list.getSelectedExport();
		assert(export_data);
		
		// Figure out where to open the dialog
		var old_path = export_data.export_path;
		var default_path = project_folder;

		if (old_path && old_path.length > 0)
		{
			// There was something in the export path, open there
			default_path += "/" + old_path;
		}
		else
		{
			// Export path is empty, generate a default
			default_path += "/" + export_data.source_layer_name + ".png";
		}

		// Open file saving dialog
		var default_file = new File(default_path);
		var selected_file = default_file.saveDlg("Export as...")

		if (selected_file)
		{
			// Store the selected path in project relative form
	       	Folder.current = project_folder;
			path_box.text = selected_file.relativeURI;

			// Update parameters for the layer
			refresh_model();
		}
	}

	// Solo export control
	var solo_box = panel.add("checkbox");
	solo_box.text = "Solo"
	solo_box.helpTip = "If one or more export item has 'Solo' ticked, export only those.";
	solo_box.onClick = refresh_model;

	// Action control
	var action_text = panel.add("statictext", undefined, "Post flatten action");
	var action_group = panel.add("group");
	var action_set_list = action_group.add("dropdownlist");

	const action_sets = get_action_sets();

	action_set_list.add("item", "NO ACTION");
	for (var i = 0; i < action_sets.length; ++i)
	{
		action_set_list.add("item", action_sets[i].name);
	}

	action_set_list.selection = 0;
	action_set_list.minimumSize = [ 300, undefined ];
	action_set_list.prev_selection = -1;
	action_set_list.next_action_selection = 0; // Kludge to prevent ugly double list update when calling refresh_view

	var action_list = action_group.add("dropdownlist");
	action_list.minimumSize = [ 300, undefined ];

	function refresh_action_list(new_selection)
	{
		action_list.removeAll();

		var selected_index = action_set_list.selection.valueOf();

		if (selected_index == 0)
		{
			// No action, disable
			action_list.enabled = false;
			if (action_list.onChange)
				action_list.onChange(); // Force change message to update the stored state
		}
		else
		{
			action_list.enabled = true;

			var actions = action_sets[selected_index - 1].actions;
			for (var i = 0; i < actions.length; ++i)
				action_list.add("item", actions[i]);
	
			action_list.selection = new_selection;
		}
	}

	action_set_list.onChange = function() 
	{
		//log("action_set_list.onChange");

		// Check if selection actually changed to prevent a few extra refreshes and events
		if (action_set_list.selection.valueOf() != action_set_list.prev_selection)
		{
			refresh_action_list(action_set_list.next_action_selection);
			action_set_list.next_action_selection = 0;
			action_set_list.prev_selection = action_set_list.selection.valueOf();
		}
	}

	refresh_action_list(0);

	function get_post_action_setting()
	{
		if (action_set_list.selection == null)
			return null; // No selection

		var action_list_index = action_set_list.selection.valueOf();
		if (action_list_index <= 0)
			return null; // Selection is "NO ACTION"

		// Fetch current post action settings
		return [ 
			action_set_list.selection.toString(),
			action_list.selection.toString() 
		];
	}

	function set_post_action(post_action_setting)
	{
		if (!post_action_setting)
		{
			action_set_list.selection = 0;
			return;
		}

		assert(post_action_setting.length == 2);
		//log("setting: " + post_action_setting[0] + ", " + post_action_setting[1]);

		var action_set_index = -1;

		for (var i = 0; i < action_sets.length; i++)
		{
			if (action_sets[i].name == post_action_setting[0])
			{
				action_set_index = i;
				break;
			}
		}

		if (action_set_index < 0)
		{
			alert("Could not find action set '" + post_action_setting[0] + "'.");
			return;
		}

		var action_index = -1;
		var actions = action_sets[action_set_index].actions;

		for (var i = 0; i < actions.length; i++)
		{
			if (actions[i] == post_action_setting[1])
			{
				action_index = i;
				break;
			}
		}

		if (action_index < 0)
		{
			alert("Could not find action '" + post_action_setting[1] + "'.");
			return;
		}

		//log("action_set_index: " + action_set_index);
		action_set_list.next_action_selection = action_index;
		action_set_list.selection = action_set_index + 1; // +1 because 0 is NO ACTION selection
		action_list.selection = action_index;
	}

	action_list.onChange = function()
	{
		//log("action_list.onChange");

		// Store the changed value
		var post_action = get_post_action_setting();

		var export_data = panel_export_list.getSelectedExport();
		export_data.post_action = post_action;

		// Write the settings back
		panel_export_list.setNewSelectionSettings(export_data);
	}

	// Resize post action control
	var resize_text = panel.add("statictext");
	var resize_box = panel.add("edittext");
	resize_box.text = "dummy";
	resize_box.onChange = function() { refresh_model(); refresh_resize_text(); };

	function refresh_resize_text()
	{
		var export_data = panel_export_list.getSelectedExport();

		if (export_data)
		{
			var resized_size =  get_resized_size(doc, export_data);
			resize_text.text = "Resize (precentage or explicit NxN) (current export res: " + resized_size[0] + " x " + resized_size[1] + ")";
		}
		else
		{
			resize_text.text = "Resize (precentage or explicit NxN)";
		}
	}

	var trim_checkbox = panel.add("checkbox")
	trim_checkbox.text = "Trim output (all sides)"
	trim_checkbox.onClick = refresh_model;

	function refresh_view()
	{
		var export_data = panel_export_list.getSelectedExport();
		
		if (export_data)
		{
			name_box.text = export_data.source_layer_name;
			path_box.text = export_data.export_path;
			solo_box.value = !!(export_data.solo);
			set_post_action(export_data.post_action);
			resize_box.text = export_data.resize;
			trim_checkbox.value = !!(export_data.trim);
		}
		else
		{
			// Nothing selected, clear view
			name_box.text = "";
			solo_box.value = undefined;
			path_box.text = "";
			resize_box.text = "";
			trim_checkbox.value = undefined;
		}

		refresh_resize_text();
	}

	function refresh_model()
	{
		var export_data = panel_export_list.getSelectedExport();
		
		if (export_data)
		{
			// Update model from the controls
			export_data.source_layer_name = name_box.text;
			export_data.export_path = path_box.text;
			export_data.solo = solo_box.value;
			export_data.trim = trim_checkbox.value;

			// Parse resize value
			var resize_txt = resize_box.text;
			if (resize_txt.indexOf('x') != -1)
			{
				// Assume explicit resolution (NxN)
				var split = resize_txt.split('x');
				var x = parseInt(split[0]) || -1;
				var y = parseInt(split[1]) || -1;

				if (x <= 0 || y <= 0)
				{
					// Failed to parse, assign default
					export_data.resize = 100;
				}
				else
				{
					// Parse ok, assing explicit resolution
					export_data.resize = [ x, y ];
				}
			}
			else
			{
				// Assume single value (percentage)
				var resize_value = parseInt(resize_box.text) || 100;
				resize_value = Math.min(Math.max(resize_value, 1), 10000);
				export_data.resize = resize_value;
			}


			// Write the settings back
			panel_export_list.setNewSelectionSettings(export_data);
		}

		//refresh_view();
	}

	var result = {
		setExportData : function(export_data)
		{
			var enabled = !!export_data;
			panel.enabled = enabled;
			refresh_view();
		}
	};

	return result;
}

///////////////////////////////////////////////////////////////////////////////
// Master buttons panel

function create_master_button_panel(win)
{
	var result = {
		onExport : function() {},
		setEnabled : function(enabled)
		{
			btn_export.enabled = enabled;
		},
		setProgress : function(value)
		{
			progress_bar.value = value * 100;
		}
	};

	// Log viewer
	var log_panel = create_empty_panel(win, "Log:");
	var log_text = log_panel.add("edittext", undefined, undefined, { multiline : true, readonly : true });
	log_text.alignment = ["fill", "fill"];
	log_text.multiline = true;
	log_text.preferredSize = [ undefined, 80 ];

	set_log_listener(function(log_line) {
		log_text.text += log_line + "\n";
		// log_text.textselection = log_line + "\n";
	})

	// Progress bar
	var progress_bar = log_panel.add("progressbar");

	// Configure buttons
	var btn_group = win.add("group");

	var btn_export = btn_group.add("button", undefined, "Export");
	btn_export.helpTip = "Export all enabled batch items to disk."
	btn_export.onClick = function () { result.onExport(); }

	var btn_export_selected = btn_group.add("button", undefined, "Export Only Selected");
	btn_export_selected.helpTip = "Export only selected (from list) item."
	btn_export_selected.onClick = function () { result.onExportSelected(); }

	var btn_quit = btn_group.add("button", undefined, "Close");
	btn_quit.helpTip = "Close the exporter UI."
	btn_quit.onClick = function () { win.close(); };

	return result;
}

///////////////////////////////////////////////////////////////////////////////
// Window creation and binding stuff together

function create_ui(doc)
{
	// Main window (modal as that's unfortunately the only thing Photoshop supports)
	var win = new Window("dialog", APPLICATION_NAME);
	var panel_project 		= create_project_panel(win);
	var panel_export_list 	= create_export_list_panel(win, doc);
	var panel_export_info	= create_export_info_panel(win, doc, panel_project, panel_export_list);
	var panel_master		= create_master_button_panel(win);
	
	function refresh_all()
	{
		var project = panel_project.getSelectedProjectFolder();
		var project_selected = !!project;
		panel_export_list.setEnabled(project_selected);
		panel_export_info.setExportData(panel_export_list.getSelectedExport());
	}

	panel_project.onProjectChanged = function()
	{
		refresh_all();
	};

	panel_export_list.onChange = function() 
	{
		refresh_all();
	};

	function progress_callback(value) 
	{
		panel_master.setProgress(value);
	}

	// Refresh panels for initial setup
	refresh_all();

	// Export callbacks
	panel_master.onExport = function() { 
		run_sprite_export_process(doc, panel_project.getSelectedProjectFolder(), null, progress_callback);
	};
	panel_master.onExportSelected = function() { 
		var selection = panel_export_list.getSelectedExport();
		if (selection)
		{
			run_sprite_export_process(doc, panel_project.getSelectedProjectFolder(), selection, progress_callback);
		}
		else
		{
			log("Nothing selected. Ignoring command.");
		}
	};

	// Log first line
	log(APPLICATION_NAME + " " + APPLICATION_VERSION + " started.");

	// Show the window
	win.show();
}

///////////////////////////////////////////////////////////////////////////////
// Export batch process script

function sprite_export(project_folder, doc, export_selection, progress_callback)
{
	// Cache layers
	var layer_cache = new_layer_cache(doc);

	// Hide all (and unhide export layer at a time)
	layer_cache.set_visible_all(false);

	// Run export on all items in the batch export list
	var export_settings = get_export_settings(doc);
	assert(export_settings);
	assert(export_settings.export_batch_items);

	for (var i = 0; i < export_settings.export_batch_items.length; ++i)
	{
		var export_data = export_settings.export_batch_items[i];
		progress_callback((i + 0.5) / export_settings.export_batch_items.length);

		// Check if this layer should be exported
		if (export_selection)
		{
			// Custom selected layer for export
			if (export_data != export_selection)
			{
				log("Item " + i + " not selected: Skipping.");
				continue;
			}
		}
		else
		{
			// Soloing check
			if (!is_export_enabled(export_settings, i))
			{
				log("Item " + i + ": Skipping, soloing other items.");
				continue;
			}
		}
	
		// Find the Photoshop layer to export
		var ps_layer = layer_cache.get_ps_layer(export_data.source_layer_name);

		if (!ps_layer)
		{
			// Skip if failed to found the layer
			log("Item " + i + ": Skipping, layer '" + export_data.source_layer_name + "' not found.");
			continue;
		}

		if (export_data.export_path.length <= 0)
		{
			log("Item " + i + ": Skipping, no export filename specified.");
			continue;
		}

		// Set correct layer visible 
		ps_layer.visible = true;

		// Duplicate and merge the document into a new single image
		var export_doc = doc.duplicate(ps_layer.name, true);

		try
		{
			// Run the post action
			try
			{
				if (export_data.post_action)
				{
					app.doAction(export_data.post_action[1], export_data.post_action[0]);
			    	export_doc.flatten(); // Flatten again after action
				}
			}
			catch (err)
			{
				alert("Failed to run post action for Item " + i + ".\n" + err);
			}

			// Resize new image per setting
			{
				var resized_size =  get_resized_size(export_doc, export_data);

				export_doc.resizeImage(
					resized_size[0], 
					resized_size[1],
					export_doc.resolution,
					ResampleMethod.BILINEAR);
			}

			// Trim
			if (export_data.trim)
			{
				export_doc.trim(TrimType.TRANSPARENT, true, true, true, true);
			}
			
			// Build target file name
			var target_filename = project_folder + "/" + export_data.export_path;
			var file_split = target_filename.split(".");
			var file_ext = file_split[file_split.length - 1];
			
			var save_options = null;
			if (file_ext)
			{
			 	if 		(file_ext == "png")
			 	{
					save_options = new PNGSaveOptions();
					save_options.compression = 1; // TODO: test that this only RLE compresses or something compared to 0 level instead of actually changing pixel values
			 	}
				else if (file_ext == "tga")
				{
					// TODO: we could do opacity to alpha channel transformation here to save alpha information if user hasn't created it (option?)

					save_options = new TargaSaveOptions();
					save_options.alphaChannels = true;
					save_options.resolution = TargaBitsPerPixels.THIRTYTWO;
					save_options.rleCompression = true;
				}
			}

			// Save new image to the target
			if (save_options)
			{
				log("Item " + i + ": Exporting to '" + target_filename + "'");

				var target_file = new File(target_filename);
				export_doc.saveAs(target_file, save_options, true, Extension.LOWERCASE);
			}
			else
			{
				log("Item " + i + ": Skipping, Unknown file type (" + file_ext + ").");
			}
		}
		catch (err)
		{
			log("Item " + i + ": Error exporting. " + err);
		}
			
		// Close the layer image
		export_doc.close(SaveOptions.DONOTSAVECHANGES);

		// Original doc visible
		app.activeDocument = doc;
		ps_layer.visible = false;
	}
}

function run_sprite_export_process(original_doc, project_folder, selected_export, progress_callback)
{
	log("### Batch export process: Starting.")
	progress_callback(0);

	// Duplicate the whole image to new document (so we don't fiddle with the master)
	var doc = original_doc.duplicate("Export TEMP copy");

	try 
	{
		sprite_export(project_folder, doc, selected_export, progress_callback);
	}
	catch (err)
	{
		alert("Something went wrong with export process." + err)
		log("Failure: " + err);
	}
		
	// Close duplicated image (no save)
	doc.close(SaveOptions.DONOTSAVECHANGES);

	log("### Batch export process: Done.")
	progress_callback(100);
}

///////////////////////////////////////////////////////////////////////////////
// Main

var xmp_ok = load_xmp_library();

if (xmp_ok)
{
	// Check if we have an open document (kludge!)
	var has_open_document = true;
	try { app.activeDocument; } catch (err) { has_open_document = false; }

	if (has_open_document)
		create_ui(app.activeDocument);
	else
		alert("Must have an open document to run " + APPLICATION_NAME);
}
