//
//  ViewController.swift
//  Stopwatch
//
//  Created by Ale Mohamad on 19/05/2019.
//  Copyright © 2019 Ale Mohamad. All rights reserved.
//

/**
 * Project #1: Build a Stopwatch
 * Get Swifty - Part 2
 * Pirple
 *
 * Your assignment is to build a stopwatch app:
 * 1. When opened it should display a blank screen with a "start" button
 * 2. When the button is clicked, the elapsed time should appear on the screen,
 *    as well as a "stop" button.
 * 3. When the "stop button is clicked" the timer should freeze at the current
 *    moment, and two buttons should display: "resume" and "reset".
 * 4. If "resume" is clicked, the timer should continue counting from the
 *    moment it was paused. If "reset" is clicked, the screen should only
 *    display a "start" button once again.
 **/

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet var counterLabel: UILabel!
    @IBOutlet var actionButton: UIBarButtonItem!
    @IBOutlet var resetButton: UIBarButtonItem!
    
    let stopwatch = Stopwatch()
    var counterStatus: counterStatuses = .reset
    var tempResetButton: UIBarButtonItem?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        prepareResetButton()
        resetCounter()
    }
    
    @IBAction func actionTapped(_ sender: Any) {
        switch counterStatus {
        case .reset:
            Timer.scheduledTimer(timeInterval: 0.01, target: self,
                                 selector: #selector(self.updateElapsedTimeLabel(_:)),
                                 userInfo: nil, repeats: true)
            counterStatus = .start
            stopwatch.start()
            actionButton.title = "Stop"
            hideResetButton()
        case .start, .resume:
            counterStatus = .stop
            stopwatch.pause()
            actionButton.title = "Resume"
            showResetButton()
        case .stop:
            Timer.scheduledTimer(timeInterval: 0.01, target: self,
                                 selector: #selector(self.updateElapsedTimeLabel(_:)),
                                 userInfo: nil, repeats: true)
            counterStatus = .resume
            stopwatch.start()
            actionButton.title = "Stop"
            hideResetButton()
        }
    }
    
    @IBAction func resetTapped(_ sender: Any) {
        resetCounter()
    }
    
    func resetCounter() {
        counterStatus = .reset
        stopwatch.stop()
        counterLabel.text = "00:00,00"
        actionButton.title = "Start"
        
        hideResetButton()
    }
    
    func prepareResetButton() {
        tempResetButton = resetButton
    }
    
    func hideResetButton() {
        navigationItem.leftBarButtonItem = nil
    }
    
    func showResetButton() {
        navigationItem.leftBarButtonItem = tempResetButton
    }
    
    @objc func updateElapsedTimeLabel(_ timer: Timer) {
        if stopwatch.isRunning {
            let minutes = Int(stopwatch.elapsedTime / 60)
            let seconds = Int(stopwatch.elapsedTime.truncatingRemainder(dividingBy: 60))
            let tenthsOfSecond = Int((stopwatch.elapsedTime * 100).truncatingRemainder(dividingBy: 100))
            counterLabel.text = String(format: "%02d:%02d,%02d",
                                       minutes, seconds, tenthsOfSecond)
        } else {
            timer.invalidate()
        }
    }
    
}

enum counterStatuses {
    case start, stop, resume, reset
}
