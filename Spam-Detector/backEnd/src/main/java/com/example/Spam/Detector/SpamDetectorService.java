package com.example.Spam.Detector;

import com.example.Spam.Detector.util.SpamDetector;
import com.example.Spam.Detector.domain.TestFile;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.TreeMap;

@Service
public class SpamDetectorService {
    private SpamDetector detector;
    private List<TestFile> results;
    private TreeMap<String, Double> accuracy;
    private TreeMap<String, Double> precision;

    public SpamDetectorService() throws IOException {
        this.detector = new SpamDetector();
        this.results = trainAndTest();
        this.accuracy = calculateAccuracy();
        this.precision = calculatePrecision();
    }

    public List<TestFile> getSpam() {
        return results;
    }
    public TreeMap<String, Double> getAccuracy(){
        return this.accuracy;
    }
    public TreeMap<String,Double> getPrecision(){
        return this.precision;
    }

    private List<TestFile> trainAndTest() {
        if (this.detector == null) {
            this.detector = new SpamDetector();
        }

        // Load the main directory "data" from the resources folder
        URL url = this.getClass().getClassLoader().getResource("data");
        File mainDirectory = null;

        if (url == null) {
            throw new RuntimeException("Data directory not found in resources");
        }

        try {
            mainDirectory = new File(url.toURI());
        } catch (URISyntaxException e) {
            throw new RuntimeException("Error converting URL to URI", e);
        }

        try {
            // Call the trainAndTest function of the detector, passing it the directory of our data resources
            return this.detector.trainAndTest(mainDirectory);
        } catch (IOException e) {
            throw new RuntimeException("Error during training and testing of SpamDetector", e);
        }
    }
    private TreeMap<String, Double> calculateAccuracy() throws IOException {
        double accuracy=0;
        int truePositive=0;
        int trueNegative=0;
        int falsePositive=0;
        for( TestFile file: results){
            if(file.getSpamProbability()<0.5 && file.getActualClass().equals("Ham")){
                truePositive+=1;
            }
            if(file.getSpamProbability()>0.5 && file.getActualClass().equals("Spam")){
                trueNegative+=1;
            }
            if(file.getSpamProbability()<0.5 && file.getActualClass().equals("Spam")){
                falsePositive+=1;
            }
        };

        TreeMap<String, Double> map = new TreeMap<>();
        map.put("value" , (double) (trueNegative + truePositive) / results.size() );
        return map;
    }
    private TreeMap<String, Double> calculatePrecision() throws IOException {
        int truePositive=0;
        int trueNegative=0;
        int falsePositive=0;
        for( TestFile file: results){
            if(file.getSpamProbability()<0.5 && file.getActualClass().equals("Ham")){
                truePositive+=1;
            }
            if(file.getSpamProbability()>0.5 && file.getActualClass().equals("Spam")){
                trueNegative+=1;
            }
            if(file.getSpamProbability()<0.5 && file.getActualClass().equals("Spam")){
                falsePositive+=1;
            }
        };

        TreeMap<String, Double> map = new TreeMap<>();
        map.put("value" , (truePositive/((double) (falsePositive+truePositive))) );
        return map;

    }
    public double calculateSpamProbability(String content){
        return this.detector.calculateSpamProbability(content);
    }

}
