package com.example.Spam.Detector;

import com.example.Spam.Detector.domain.TestFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.TreeMap;

@RestController
@RequestMapping(path = "api/v1/spam")
public class SpamDetectorController {
    private final SpamDetectorService spamDetector;
    @Autowired
    public SpamDetectorController(SpamDetectorService spamDetector){

        this.spamDetector = spamDetector;
    }
    @GetMapping
    public List<TestFile> getSpams(){
        return spamDetector.getSpam();

    }
    @GetMapping(path = "accuracy")
    public TreeMap<String, Double> getAccuracy(){
        return spamDetector.getAccuracy();
    }
    @GetMapping(path = "precision")
    public TreeMap<String, Double> getPrecision(){
        return spamDetector.getPrecision();

    }
    @PostMapping(path = "file")
    public double processFile(@RequestBody String content){
        return spamDetector.calculateSpamProbability(content);
    }








}
