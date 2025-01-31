var jpdbBaseUrl = 'http://api.login2explore.com:5577';
var connToken = '90931978|-31949224643896775|90962495';
var empDBName = 'EMP-DB';
var empRelationName = 'EmpData';
var jpdbIML = '/api/iml';
var jpdbIRL = '/api/irl';
$('#empid').focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);
}

function getEmpIdAsJsonObj() {
    var empId = $('#empid').val();
    var jsonStr = { id: empId };
    return JSON.stringify(jsonStr);
}

function fillData(JsonObj) {
    saveRecNo2LS(JsonObj);
    var record = JSON.parse(JsonObj.data).record;
    $('#empname').val(record.name);
    $('#empsal').val(record.sal);
    $('#hra').val(record.hra);
    $('#da').val(record.da);
    $('#deduct').val(record.deduction);
}

function resetForm() {
    $('#empid').val('');
    $('#empname').val('');
    $('#empsal').val('');
    $('#hra').val('');
    $('#da').val('');
    $('#deduct').val('');
    $('#empid').prop('disabled', false);
    $('#save').prop('disabled', true);
    $('#change').prop('disabled', true);
    $('#reset').prop('disabled', true);
    $('#empid').focus();
}

function saveData() {
        var jsonStrObj = validateData();
        if (!jsonStrObj) { // If data validation fails, return early
            return;
        }
    
        // Create PUT request using the JsonPowerDB API
        var putRequest = createPUTRequest(connToken, jsonStrObj, empDBName, empRelationName);
    
        // Send the PUT request to JsonPowerDB
        jQuery.ajaxSetup({async: false});
        var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseUrl, jpdbIML);
        jQuery.ajaxSetup({async: true});
    
        console.log(resJsonObj);  // Check the response for errors
    
        if (resJsonObj.status === 200) {
            alert('Data saved successfully');
            resetForm();
        } else {
            alert('Error in saving data');
        }
    
        $('#empid').focus();
    
    
    var putRequest = createPutRequest(connToken, jsonStrObj, empDBName, empRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommanndAtGivenBaseUrl(putRequest, jpdbBaseUrl, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#empid').focus();
}

function changeData() {
    $('#change').prop('disabled', true);
    var jsonChg = validateData();
    if (!jsonChg) { // Validation failed
        return;
    }
    var updateRequest = createPutRequest(connToken, jsonChg, empDBName, empRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommanndAtGivenBaseUrl(updateRequest, jpdbBaseUrl, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#empid').focus();
}

function validateData() {
    var empid = $('#empid').val();
    var empname = $('#empname').val();
    var empsal = $('#empsal').val();
    var hra = $('#hra').val();
    var da = $('#da').val();
    var deduct = $('#deduct').val();

    if (!empid || !empname || !empsal || !hra || !da || !deduct) {
        alert('Please fill out all the fields.');
        return null;
    }

    var jsonStrObj = {
        id: empid,
        name: empname,
        sal: empsal,
        hra: hra,
        da: da,
        deduction: deduct
    };
    return JSON.stringify(jsonStrObj);
}

function getEmp() {
    var jsonStrObj = getEmpIdAsJsonObj();
    var getRequest = createGet_BY_KEYRequest(connToken, empDBName, empRelationName, jsonStrObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommanndAtGivenBaseUrl(getRequest, jpdbBaseUrl, jpdbIRL);
    jQuery.ajaxSetup({async: true});

    if (resJsonObj.status == 400) {
        $('#save').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#empname').focus();
    } else if (resJsonObj.status == 200) {
        $('#empid').prop('disabled', true);
        fillData(resJsonObj);
        $('#change').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#empname').focus();
    }
}

// Attach event listeners to each input field
$('#empid, #empname, #empsal, #hra, #da, #deduct').on('input', function() {
    checkIfFormIsFilled();
});

function checkIfFormIsFilled() {
    var empid = $('#empid').val();
    var empname = $('#empname').val();
    var empsal = $('#empsal').val();
    var hra = $('#hra').val();
    var da = $('#da').val();
    var deduct = $('#deduct').val();

    if (empid && empname && empsal && hra && da && deduct) {
        $('#save').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#change').prop('disabled', false);
    } else {
        $('#save').prop('disabled', true);
        $('#reset').prop('disabled', true);
        $('#change').prop('disabled', true);
    }
}
