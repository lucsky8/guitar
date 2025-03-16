// Song data array with detailed music theory explanations
const songData = [
  {
    id: 1,
    title: "Blackbird",
    artist: "The Beatles",
    album: "The White Album",
    year: 1968,
    key: "G",
    bpm: 94, // Added BPM information
    recommendedScales: [
      { 
        name: "G major pentatonic", 
        value: "G", 
        type: "major-pentatonic",
        description: "Perfect for the song's major key feel and melodic sections.",
        theoryExplanation: "G major pentatonic (G-A-B-D-E) contains the essential notes of the G major scale without any potentially dissonant notes. These notes are found in most of the chords in the progression, making it a safe and melodic choice for improvisation.",
        // New improvisation examples
        improvisationExamples: [
          {
            name: "Complete Blackbird Progression Lick",
            description: "This comprehensive example follows the entire chord progression of Blackbird, utilizing all strings and multiple positions. Each phrase targets chord tones from the underlying harmony.",
            positions: [1, 2, 3],
            chordLabels: ["G", "Am7", "G/B", "C", "G/D", "D7", "Em"],
            tabNotation: [
              "Chord:     G                Am7              G/B               C",
              "e|---------------------|----------------------|----------------------|----------------------|",
              "B|---------------------|----------------------|----------------------|----------------------|",
              "G|---------------------|--7---5------------- -|----------------------|---5---4------------ -|",
              "D|--7---5--------------|----------------------|--7----------------- -|----------------------|",
              "A|------------7---5----|------7---5-------- --|------------7---------|------7---5------- ---|",
              "E|---------------------|----------------------|----------------------|----------------------|",
              "",
              "Chord:     G/D               D7                Em",
              "e|----------------------|----------------------|----------------------|",
              "B|---8---7---5----------|----------------------|--3--------------- ---|",
              "G|----------------------|---7---5--------------|--------4---2----- ---|",
              "D|----------------------|----------------------|----------------------|",
              "A|----------------------|----------------------|----------------------|",
              "E|----------------------|----------------------|--0---------------- --|"
            ],
            playbackTips: "Take your time with each phrase. Try to play along with the recording of Blackbird at a slow tempo, making sure each note rings clearly before moving to the next one."
          }
        ]
      },
      { 
        name: "E minor pentatonic", 
        value: "E", 
        type: "minor-pentatonic",
        description: "Works well for improvising over the minor-feel sections and adding bluesy touches.",
        theoryExplanation: "E minor is the relative minor of G major, meaning they share the same key signature. The E minor pentatonic scale (E-G-A-B-D) contains notes that work well over both the major and minor chords in the progression. This scale gives a slightly bluesier sound that contrasts nicely with the folk feeling of the song.",
        // New improvisation examples
        improvisationExamples: [
          {
            name: "Complete Blackbird Progression - E Minor Pentatonic",
            description: "This comprehensive example follows the chord progression of Blackbird using E minor pentatonic, showcasing how to add bluesy, emotive phrases that complement the folk character of the song.",
            positions: [1, 2, 3],
            chordLabels: ["G", "Am7", "G/B", "C", "G/D", "D7", "Em"],
            tabNotation: [
              "Chord:     G                Am7              G/B               C",
              "e|--0---3---------------|---------------------|--0------------------|----------------------|",
              "B|------------3---0-----|--3---0--------------|---------------------|--3---0---------------|",
              "G|----------------------|------------2---0----|------------2---0----|----------------------|",
              "D|----------------------|---------------------|---------------------|------------2---0-----|",
              "A|----------------------|--0------------------|---------------------|----------------------|",
              "E|----------------------|---------------------|--0------------------|----------------------|",
              "",
              "Chord:     G/D               D7                Em",
              "e|----------------------|--0---3--------------|--0------------------|",
              "B|----------------------|------------3---0----|------------3---0----|",
              "G|--2---0---------------|---------------------|---------------------|",
              "D|----------------------|--0------------------|---------------------|",
              "A|--0-------------------|---------------------|--0---2--------------|",
              "E|----------------------|---------------------|--0------------------|"
            ],
            playbackTips: "Use your index finger for the open strings and focus on clean transitions. These simple phrases give you plenty of time to think about the next note, making them perfect for beginners."
          }
        ]
      }
    ],
    chordProgression: "G, Am7, G/B, C, G/D, D7, Em",
    progressionAnalysis: "This progression is firmly in G major. It starts with G (the I chord), moves to Am7 (the ii minor chord), then uses bass movement with G/B. The C chord (IV) and D7 (V7) create a classic harmonic movement that resolves back to G. The Em (vi) adds a minor feel that gives the song its distinctive sound.",
    description: "Blackbird uses a fingerpicked pattern in a primarily G major tonality, with some modal mixture. The song has a folk influence with melodic bass movement."
  },
  // You can add more songs here as you expand your database
];

export default songData;