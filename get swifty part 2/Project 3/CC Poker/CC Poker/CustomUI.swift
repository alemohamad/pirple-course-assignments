//
//  CustomUI.swift
//  CC Poker
//
//  Created by Ale Mohamad on 23/05/2019.
//  Copyright © 2019 Ale Mohamad. All rights reserved.
//

import UIKit

@IBDesignable
class RoundButton: UIButton {
    
    @IBInspectable var bgColor: UIColor = .white {
        didSet {
            setupView()
        }
    }
    
    @IBInspectable var color: UIColor = .black {
        didSet {
            setupView()
        }
    }
    
    @IBInspectable var radius: CGFloat = 2 {
        didSet {
            setupView()
        }
    }
    
    override func prepareForInterfaceBuilder() {
        super.prepareForInterfaceBuilder()
        setupView()
    }
    
    func setupView() {
        clipsToBounds = true
        layer.cornerRadius = radius
        backgroundColor = bgColor
        setTitleColor(color, for: .normal)
    }
    
}
