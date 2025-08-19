function setBeneFields(context)
{
    Xrm.Page.getAttribute("statecode").getValue() == 0)
    {
        var address = "";
        var name = "";
        var facilityName = "";
        Xrm.Page.getAttribute("hac_callername").setValue(name);
        Xrm.Page.getAttribute("hac_calleraddress").setValue(address);
        Xrm.Page.getAttribute("hac_facilityname").setValue(facilityName);
    }
}

function setMeaningfulFields(context, CallerAddress, CallerName)
{
    var address = CallerAddress;
    var name = CallerName;
    var facilityName = "";
    if (Xrm.Page.getAttribute("statecode").getValue() == 0)
    {
        Xrm.Page.getAttribute("hac_callername").setValue(name);
        Xrm.Page.getAttribute("hac_calleraddress").setValue(address);
        Xrm.Page.getAttribute("hac_facilityname").setValue(facilityName);
    }
}

function setProviderFields(context, CallerAddress, CallerName, CallerFacilityName)
{
    var address = CallerAddress;
    var name = CallerName;
    var facilityName = CallerFacilityName;
    if (Xrm.Page.getAttribute("statecode").getValue() == 0)
    {
        Xrm.Page.getAttribute("hac_callername").setValue(name);
        Xrm.Page.getAttribute("hac_calleraddress").setValue(address);
        Xrm.Page.getAttribute("hac_facilityname").setValue(facilityName);
    }

    setAllAttributesDirtySend();
    //OnChangeCallerValidated(); // Update the bottom of the form to show the Provider fields.
}

function setSponsorFields(context, CallerAddress, SponsorAddressLine1, ZIP, Country)
{
    if (Xrm.Page.getAttribute("statecode").getValue() == 0)
    {
        var address = CallerAddress;
        if ("" == "")
            address = SponsorAddressLine1 + " " + ZIP + "  " + Country;
        else
            address = CallerAddress;
        Xrm.Page.getAttribute("hac_callername").setValue("[[IdProofing.SponsorName]+]");
        Xrm.Page.getAttribute("hac_calleraddress").setValue(address);
        Xrm.Page.getAttribute("hac_facilityname").setValue("");
    }

    setAllAttributesDirtySend();
    //OnLoadChangeCallerType(); // Update the bottom of the form to show the Provider fields.
}

function setVSOFields(context, CallerAddress,CallerName, CallerFacilityName)
{
    var address = CallerAddress;
    var name = CallerName;
    var facilityName = CallerFacilityName;
    if (Xrm.Page.getAttribute("statecode").getValue() == 0)
    {
        Xrm.Page.getAttribute("hac_callername").setValue(name);
        Xrm.Page.getAttribute("hac_calleraddress").setValue(address);
        Xrm.Page.getAttribute("hac_facilityname").setValue(facilityName);
    }
    //OnLoadChangeCallerType(); // Update the bottom of the form to show the Provider fields.
}

