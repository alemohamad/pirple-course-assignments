//
//  ViewController.swift
//  Converter
//
//  Created by Ale Mohamad on 19/05/2019.
//  Copyright © 2019 Ale Mohamad. All rights reserved.
//

/**
 * Project #2: Build a Metric to Imperial Converter
 *
 * Your assignment is to build a Metric to Imperial app:
 * 1. When opened it should display a title, welcome message, and a dropdown
 *    that lets you select either "weight", "length", or "volume"
 * 2. When an option is selected, the user should be taken to a form when they
 *    can enter a number, select a corresponding starting unit (such as
 *    "millimeters" or "gallons"), select an ending unit (such as "feet" or
 *    "liters"), and click a button that says "convert"
 * 3. Once the "convert" button is clicked, the result should be displayed on
 *    the screen, as well as a "start over" button that takes the user back
 *    to the home screen.
 * 4. Make sure your app allows users to convert between any of the following
 *    (once they choose the appropriate selection on the home page). It should
 *    also allow them to convert in either direction (Metric to Imperial but
 *    also Imperial to Metric).
 *
 * Extra Credit:
 * Although not strictly part of the Imperial / Metric regimes, add a 4th
 * option to your converter: "Temperature", which allows the user to switch
 * between degrees Celsius and Fahrenheit.
 **/

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet var originalValueTextField: UITextField!
    @IBOutlet var selectorPickerView: UIPickerView!
    @IBOutlet var resultLabel: UILabel!
    
    var selectedConversion: conversionTypes = .weight
    
    let weightOptions = ["Pounds", "Ounces", "Stone", "Milligrams", "Grams", "Kilograms", "Tons"]
    let weightValues: [Double] = [1, 16, 0.0714286, 453592.3, 453.5923, 0.4535923, 0.0004535923]
    
    let lengthOptions = ["Inches", "Feet", "Yards", "Miles", "Millimeters", "Centimeters", "Meters", "Kilometers"]
    let lengthValues: [Double] = [1, 0.083333, 0.027778, 0.000015783, 25.4, 2.54, 0.0254, 0.0000254]
    
    let volumeOptions = ["Teaspoon", "Tablespoon", "Cups", "Quarts", "Gallons", "Milliliters", "Deciliters", "Liters"]
    let volumeValues: [Double] = [1, 3, 0.020833, 0.005208, 0.001302, 4.928922, 0.04928922, 0.004929]
    
    let temperatureOptions = ["Celsius", "Fahrenheit"]
    
    var tempPickerValues = [String]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        prepareInitialValues()
        originalValueTextField.becomeFirstResponder()
    }
    
    @IBAction func changedMeasure(_ sender: UISegmentedControl) {
        guard let selectedIndex = conversionTypes(rawValue: sender.selectedSegmentIndex) else {
            return
        }
        
        selectedConversion = selectedIndex
        
        switch selectedIndex {
        case .weight:
            changePickerData(with: weightOptions)
        case .length:
            changePickerData(with: lengthOptions)
        case .volume:
            changePickerData(with: volumeOptions)
        case .temperature:
            changePickerData(with: temperatureOptions)
        }
    }
    
    @IBAction func convertTapped(_ sender: Any) {
        if let valueText = originalValueTextField.text, !valueText.isEmpty, let value = Double(valueText) {
            let pickerValues = getPickerValues()
            
            let resultConversion = convert(value, type: selectedConversion, from: pickerValues.from, to: pickerValues.to)
            let measureTo = tempPickerValues[pickerValues.to]
            
            resultLabel.text = "\(resultConversion) \(measureTo)"
        }
    }
    
    func prepareInitialValues() {
        changePickerData(with: weightOptions)
        resultLabel.text = ""
    }
    
    func changePickerData(with values: [String]) {
        tempPickerValues = values
        selectorPickerView.reloadAllComponents()
    }
    
    func getPickerValues() -> (from: Int, to: Int) {
        let firstSelectedIndex = selectorPickerView.selectedRow(inComponent: 0)
        let secondSelectedIndex = selectorPickerView.selectedRow(inComponent: 1)
        
        return (from: firstSelectedIndex, to: secondSelectedIndex)
    }
    
    func convert(_ value: Double, type: conversionTypes, from: Int, to: Int) -> String {
        var resultConversion = 0.0
        var fromMultiplier = 0.0
        var toMultiplier = 0.0
        
        switch type {
        case .weight:
            fromMultiplier = weightValues[from]
            toMultiplier = weightValues[to]
        case .length:
            fromMultiplier = lengthValues[from]
            toMultiplier = lengthValues[to]
        case .volume:
            fromMultiplier = volumeValues[from]
            toMultiplier = volumeValues[to]
        case .temperature:
            if from == 0 && to == 1 {
                resultConversion = (value * 1.8) + 32.00
            } else if from == 1 && to == 0 {
                resultConversion = (value - 32.00) / 1.8
            } else {
                resultConversion = value
            }
        }
        
        if type != .temperature {
            resultConversion = value * toMultiplier / fromMultiplier
        }
        
        if let resultDouble = Double(String(format: "%.6f", resultConversion)) {
            return String(resultDouble)
        }
        
        return String(format: "%.6f", resultConversion)
    }
    
}

extension ViewController: UIPickerViewDelegate, UIPickerViewDataSource {
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 2
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return tempPickerValues.count
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return tempPickerValues[row]
    }
    
}

enum conversionTypes: Int {
    case weight = 0, length, volume, temperature
}
