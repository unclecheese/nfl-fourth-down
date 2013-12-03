



    var Cydr = {};

    Cydr.Collection             = require('src/model/collection');
    Cydr.Model                  = require('src/model/model');
    Cydr.DataList               = require('src/model/datalist');
    Cydr.ViewModel              = require('src/model/viewmodel');
    Cydr.JSONData               = require('src/model/jsondata');

    Cydr.Boolean                = require('src/datatypes/boolean');
    Cydr.HTMLText               = require('src/datatypes/htmltext');
    Cydr.Text                   = require('src/datatypes/text');
    Cydr.Float                  = require('src/datatypes/float');
    Cydr.Int                    = require('src/datatypes/int');

    Cydr.CheckedBinding         = require('src/bindings/checked');
    Cydr.ClickBinding           = require('src/bindings/click');
    Cydr.ContentBinding         = require('src/bindings/content');
    Cydr.HiddenBinding          = require('src/bindings/hidden');
    Cydr.VisibleBinding         = require('src/bindings/visible');
    Cydr.SubmitBinding          = require('src/bindings/submit');
    Cydr.ValueBinding           = require('src/bindings/value');
    Cydr.AttrBinding            = require('src/bindings/json/attr');
    Cydr.ExtraclassesBinding    = require('src/bindings/json/extraclasses');
    Cydr.LoopBinding            = require('src/bindings/loop/loop');
    Cydr.OptionsBinding         = require('src/bindings/loop/options');

    Cydr.Model.Cydr = Cydr;
    Cydr.Model.Collection = Cydr.Collection;
    Cydr.Collection.Model = Cydr.Model;

    return Cydr;


}));